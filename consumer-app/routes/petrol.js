const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { requireLogin, checkPrebookingSuspension } = require('../middleware/auth');
const { readData, findOne, findAll, insertOne, updateOne } = require('../helpers/storage');
const {
  generatePumpSlots,
  generatePetrolToken,
  nextDays,
  formatDate,
  getMaxLitres,
  getAdvanceBookingDays,
  getNextAvailableSlot
} = require('../helpers/queue');

// GET /petrol/pumps — find & compare pumps
router.get('/pumps', (req, res) => {
  const pumps = readData('pumps');
  const crisis = readData('crisis');
  const { pin, brand, stock, grade } = req.query;

  let filtered = pumps;
  if (pin) filtered = filtered.filter(p => p.pin_code.startsWith(pin.trim().slice(0, 3)));
  if (brand) filtered = filtered.filter(p => p.brand === brand);
  if (stock) filtered = filtered.filter(p => p.stock_level === stock);
  if (grade) filtered = filtered.filter(p => p.fuel_grades.some(g => g.grade === grade));

  // Attach next available slot info
  filtered = filtered.map(p => ({
    ...p,
    nextSlot: getNextAvailableSlot(p)
  }));

  res.render('pages/petrol/pumps', {
    title: 'Find Petrol Pumps — FuelIndia',
    pumps: filtered,
    allPumps: pumps,
    crisis,
    query: req.query
  });
});

// GET /petrol/book/:pumpId — show booking calendar
router.get('/book/:pumpId', requireLogin, checkPrebookingSuspension, (req, res) => {
  const pump = findOne('pumps', 'id', req.params.pumpId);
  if (!pump) {
    req.flash('error', 'Petrol pump not found.');
    return res.redirect('/petrol/pumps');
  }

  if (pump.booking_suspended) {
    req.flash('error', 'Bookings are currently suspended at this pump. Please try another location.');
    return res.redirect('/petrol/pumps');
  }

  const crisis = readData('crisis');
  const consumer = req.session.consumer;
  const maxDays = getAdvanceBookingDays(pump) + 1;
  const days = nextDays(maxDays);
  const maxLitres = getMaxLitres(pump, crisis);

  // Check if consumer already has an active booking at any pump today
  const today = days[0];
  const activeBooking = findOne('bookings_petrol', 'consumer_id', consumer.id);

  // Build slot data per day
  const slotsByDay = {};
  days.forEach(d => {
    slotsByDay[d] = generatePumpSlots(pump, d);
  });

  res.render('pages/petrol/book', {
    title: `Book Slot — ${pump.name}`,
    pump,
    crisis,
    consumer,
    days,
    slotsByDay,
    maxLitres,
    formatDate,
    selectedDate: req.query.date || today,
    activeBooking
  });
});

// POST /petrol/book — process booking
router.post('/book', requireLogin, checkPrebookingSuspension, (req, res) => {
  const { pump_id, slot_date, slot_time, vehicle_rc, fuel_grade, quantity_litres } = req.body;
  const consumer = req.session.consumer;
  const crisis = readData('crisis');

  const pump = findOne('pumps', 'id', pump_id);
  if (!pump) {
    req.flash('error', 'Invalid pump selected.');
    return res.redirect('/petrol/pumps');
  }

  // Validate quantity
  const maxLitres = getMaxLitres(pump, crisis);
  const qty = parseFloat(quantity_litres);
  if (isNaN(qty) || qty <= 0 || qty > maxLitres) {
    req.flash('error', `Quantity must be between 1 and ${maxLitres} litres.`);
    return res.redirect(`/petrol/book/${pump_id}?date=${slot_date}`);
  }

  // Check slot availability
  const slots = generatePumpSlots(pump, slot_date);
  const slot = slots.find(s => s.time === slot_time);
  if (!slot || slot.full) {
    req.flash('error', 'This slot is no longer available. Please choose another slot.');
    return res.redirect(`/petrol/book/${pump_id}?date=${slot_date}`);
  }

  // Prevent duplicate booking (same vehicle same day)
  const existingToday = findAll('bookings_petrol', b =>
    b.consumer_id === consumer.id &&
    b.slot_date === slot_date &&
    b.vehicle_rc === vehicle_rc &&
    !['CANCELLED', 'NO_SHOW'].includes(b.status)
  );
  if (existingToday.length > 0) {
    req.flash('error', 'You already have an active booking for this vehicle today. Cancel the existing booking first.');
    return res.redirect(`/petrol/book/${pump_id}?date=${slot_date}`);
  }

  // Get grade price
  const gradeInfo = pump.fuel_grades.find(g => g.grade === fuel_grade);
  if (!gradeInfo) {
    req.flash('error', 'Invalid fuel grade selected.');
    return res.redirect(`/petrol/book/${pump_id}?date=${slot_date}`);
  }

  const amount = parseFloat((gradeInfo.price_per_litre * qty).toFixed(2));
  const bookingToken = generatePetrolToken();
  const bookingId = 'PTR-' + Date.now();

  const booking = {
    id: bookingId,
    token: bookingToken,
    consumer_id: consumer.id,
    consumer_name: consumer.name,
    consumer_mobile: consumer.mobile,
    pump_id: pump.id,
    pump_name: pump.name,
    pump_address: pump.address,
    slot_date,
    slot_time,
    slot_window_minutes: pump.slot_duration_minutes,
    vehicle_rc,
    fuel_grade,
    quantity_litres: qty,
    price_per_litre: gradeInfo.price_per_litre,
    amount_paid: amount,
    payment_status: 'PAID',
    payment_method: 'UPI',
    payment_ref: 'UPI-' + Date.now(),
    status: 'CONFIRMED',
    qr_used: false,
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    delivered_at: null,
    cancellation_reason: null,
    grace_expires_at: null
  };

  insertOne('bookings_petrol', booking);

  req.flash('success', `Booking confirmed! Token: ${bookingToken}`);
  res.redirect(`/petrol/qr/${bookingId}`);
});

// GET /petrol/qr/:bookingId — show QR code
router.get('/qr/:bookingId', requireLogin, async (req, res) => {
  const booking = findOne('bookings_petrol', 'id', req.params.bookingId);

  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-petrol');
  }

  const qrPayload = JSON.stringify({
    booking_id: booking.id,
    token: booking.token,
    pump_id: booking.pump_id,
    slot_date: booking.slot_date,
    slot_time: booking.slot_time,
    vehicle_rc: booking.vehicle_rc,
    fuel_grade: booking.fuel_grade,
    quantity_litres: booking.quantity_litres,
    amount_paid: booking.amount_paid,
    consumer_mobile: booking.consumer_mobile,
    status: booking.status
  });

  try {
    const qrDataURL = await QRCode.toDataURL(qrPayload, {
      width: 300,
      margin: 2,
      color: { dark: '#1e293b', light: '#f8fafc' }
    });
    res.render('pages/petrol/qr', {
      title: `Booking QR — ${booking.token}`,
      booking,
      qrDataURL,
      formatDate
    });
  } catch (err) {
    req.flash('error', 'Failed to generate QR code.');
    res.redirect('/booking/my-petrol');
  }
});

// POST /petrol/cancel/:bookingId — cancel a booking
router.post('/cancel/:bookingId', requireLogin, (req, res) => {
  const booking = findOne('bookings_petrol', 'id', req.params.bookingId);

  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-petrol');
  }

  if (['COMPLETED', 'CANCELLED', 'NO_SHOW', 'OUT_FOR_DELIVERY'].includes(booking.status)) {
    req.flash('error', 'This booking cannot be cancelled at this stage.');
    return res.redirect('/booking/my-petrol');
  }

  // Calculate refund
  const bookingTime = new Date(booking.created_at);
  const slotTime = new Date(`${booking.slot_date}T${booking.slot_time}:00`);
  const now = new Date();
  const hoursToSlot = (slotTime - now) / (1000 * 60 * 60);

  let refundPercent = 100;
  let refundNote = 'Full refund';
  if (hoursToSlot < 1) { refundPercent = 75; refundNote = '75% refund (cancelled < 1hr before slot)'; }
  else if (hoursToSlot < 2) { refundPercent = 90; refundNote = '90% refund (cancelled < 2hrs before slot)'; }

  updateOne('bookings_petrol', req.params.bookingId, {
    status: 'CANCELLED',
    cancellation_reason: req.body.reason || 'Consumer cancelled',
    cancelled_at: now.toISOString(),
    refund_percent: refundPercent,
    refund_amount: parseFloat((booking.amount_paid * refundPercent / 100).toFixed(2)),
    refund_note: refundNote
  });

  req.flash('success', `Booking cancelled. ${refundNote} of ₹${(booking.amount_paid * refundPercent / 100).toFixed(2)} will be processed within 2 hours.`);
  res.redirect('/booking/my-petrol');
});

module.exports = router;
