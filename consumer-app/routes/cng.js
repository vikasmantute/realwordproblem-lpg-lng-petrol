const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { readData, findAll, findOne, insertOne, updateOne } = require('../helpers/storage');
const {
  generateCNGSlots, generateCNGToken, getMaxKg, getCNGAdvanceDays,
  getNextAvailableCNGSlot, todayStr, nextDays, formatDate
} = require('../helpers/queue');
const { requireLogin, checkPrebookingSuspension } = require('../middleware/auth');

// ─── GET /cng/stations — public station finder ─────────────────
router.get('/stations', (req, res) => {
  const stations = findAll('stations_cng');
  const crisis = readData('crisis');

  // Annotate each station with next available slot
  const stationsWithSlots = stations.map(s => ({
    ...s,
    nextSlot: getNextAvailableCNGSlot(s)
  }));

  res.render('pages/cng/stations', {
    title: 'CNG Stations — FuelIndia',
    stations: stationsWithSlots,
    crisis,
    consumer: req.session.consumer || null
  });
});

// ─── GET /cng/book/:stationId — slot booking page ──────────────
router.get('/book/:stationId', requireLogin, (req, res) => {
  const station = findOne('stations_cng', 'id', req.params.stationId);
  if (!station || station.status === 'CLOSED') {
    req.flash('error', 'Station not found or currently closed.');
    return res.redirect('/cng/stations');
  }

  const crisis = readData('crisis');
  const consumer = req.session.consumer;

  const advanceDays = getCNGAdvanceDays(station);
  const bookableDays = nextDays(advanceDays + 1);
  const selectedDate = req.query.date || todayStr();
  const slots = generateCNGSlots(station, selectedDate);

  // Active CNG booking for this consumer
  const activeBooking = findAll('bookings_cng', b =>
    b.consumer_id === consumer.id &&
    !['CANCELLED', 'COMPLETED', 'NO_SHOW'].includes(b.status)
  )[0] || null;

  res.render('pages/cng/book', {
    title: `Book CNG Slot — ${station.name}`,
    station,
    slots,
    bookableDays,
    selectedDate,
    crisis,
    consumer,
    activeBooking,
    formatDate
  });
});

// ─── POST /cng/book — process booking ──────────────────────────
router.post('/book', requireLogin, checkPrebookingSuspension, async (req, res) => {
  const { station_id, slot_date, slot_time, vehicle_rc, vehicle_type, kg_requested } = req.body;
  const consumer = req.session.consumer;
  const crisis = readData('crisis');

  const station = findOne('stations_cng', 'id', station_id);
  if (!station) {
    req.flash('error', 'Invalid station selected.');
    return res.redirect('/cng/stations');
  }

  const kg = parseFloat(kg_requested);
  const maxKg = getMaxKg(station, vehicle_type);

  if (isNaN(kg) || kg <= 0 || kg > maxKg) {
    req.flash('error', `Quantity must be between 0.5 and ${maxKg} kg for your vehicle type.`);
    return res.redirect(`/cng/book/${station_id}?date=${slot_date}`);
  }

  // Check slot availability
  const slots = generateCNGSlots(station, slot_date);
  const slot = slots.find(s => s.time === slot_time);
  if (!slot || slot.full) {
    req.flash('error', 'This slot is no longer available. Please choose another.');
    return res.redirect(`/cng/book/${station_id}?date=${slot_date}`);
  }

  // Prevent duplicate booking (same vehicle same day)
  const existingToday = findAll('bookings_cng', b =>
    b.consumer_id === consumer.id &&
    b.slot_date === slot_date &&
    b.vehicle_rc === vehicle_rc &&
    !['CANCELLED', 'NO_SHOW'].includes(b.status)
  );
  if (existingToday.length > 0) {
    req.flash('error', 'You already have a CNG booking for this vehicle on this date.');
    return res.redirect(`/cng/book/${station_id}?date=${slot_date}`);
  }

  const amount = parseFloat((station.price_per_kg * kg).toFixed(2));
  const token = generateCNGToken();
  const bookingId = 'CNG-' + Date.now();

  const booking = {
    id: bookingId,
    token,
    consumer_id: consumer.id,
    consumer_name: consumer.name,
    consumer_mobile: consumer.mobile,
    station_id: station.id,
    station_name: station.name,
    station_address: station.address,
    slot_date,
    slot_time,
    slot_duration_minutes: station.slot_duration_minutes,
    vehicle_rc,
    vehicle_type,
    kg_requested: kg,
    price_per_kg: station.price_per_kg,
    amount_paid: amount,
    payment_status: 'PAID',
    payment_method: 'UPI',
    payment_ref: 'UPI-' + Date.now(),
    status: 'CONFIRMED',
    qr_used: false,
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    cancelled_at: null,
    cancel_reason: null
  };

  insertOne('bookings_cng', booking);

  // Award loyalty points (1 point per ₹10)
  const pointsEarned = Math.floor(amount / 10);
  const fullConsumer = findOne('consumers', 'id', consumer.id);
  if (fullConsumer) {
    updateOne('consumers', consumer.id, {
      loyalty_points: (fullConsumer.loyalty_points || 0) + pointsEarned
    });
  }

  req.flash('success', `CNG slot booked! Token: ${token}`);
  res.redirect(`/cng/qr/${bookingId}`);
});

// ─── GET /cng/qr/:bookingId — show QR token ────────────────────
router.get('/qr/:bookingId', requireLogin, async (req, res) => {
  const booking = findOne('bookings_cng', 'id', req.params.bookingId);
  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-cng');
  }

  const qrPayload = JSON.stringify({
    token: booking.token,
    booking_id: booking.id,
    consumer_id: booking.consumer_id,
    station_id: booking.station_id,
    slot_date: booking.slot_date,
    slot_time: booking.slot_time,
    vehicle_rc: booking.vehicle_rc,
    kg: booking.kg_requested,
    ts: Date.now()
  });

  const qrDataUrl = await QRCode.toDataURL(qrPayload, {
    width: 280,
    color: { dark: '#1e293b', light: '#f8fafc' }
  });

  res.render('pages/cng/qr', {
    title: `CNG Token — ${booking.token}`,
    booking,
    qrDataUrl,
    formatDate
  });
});

// ─── POST /cng/cancel/:bookingId — cancel booking ──────────────
router.post('/cancel/:bookingId', requireLogin, (req, res) => {
  const booking = findOne('bookings_cng', 'id', req.params.bookingId);
  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-cng');
  }

  if (['CANCELLED', 'COMPLETED'].includes(booking.status)) {
    req.flash('error', 'This booking cannot be cancelled.');
    return res.redirect(`/cng/qr/${booking.id}`);
  }

  updateOne('bookings_cng', booking.id, {
    status: 'CANCELLED',
    cancelled_at: new Date().toISOString(),
    cancel_reason: req.body.reason || 'Consumer cancelled'
  });

  req.flash('success', 'CNG booking cancelled. Full refund will be processed within 24 hours.');
  res.redirect('/booking/my-cng');
});

module.exports = router;

