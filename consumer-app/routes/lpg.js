const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth');
const { readData, findOne, findAll, insertOne, updateOne } = require('../helpers/storage');
const { generateLPGToken, getLPGQueuePosition, nextDays, formatDate } = require('../helpers/queue');

// GET /lpg/book
router.get('/book', requireLogin, (req, res) => {
  const consumer = req.session.consumer;
  const distributors = readData('distributors');
  const crisis = readData('crisis');

  // Filter distributors near consumer's pin code (simplified: same first 3 digits)
  const nearby = distributors.filter(d =>
    d.pin_code.slice(0, 3) === consumer.pin_code.slice(0, 3)
  );

  // Check if consumer already has an active LPG booking
  const activeBooking = findAll('bookings_lpg', b =>
    b.consumer_id === consumer.id &&
    !['DELIVERED', 'CANCELLED'].includes(b.status)
  );

  res.render('pages/lpg/book', {
    title: 'Book LPG Cylinder — FuelIndia',
    consumer,
    distributors: nearby.length ? nearby : distributors,
    crisis,
    activeBooking: activeBooking[0] || null,
    formatDate,
    days: nextDays(7)
  });
});

// POST /lpg/book
router.post('/book', requireLogin, (req, res) => {
  const { distributor_id, cylinder_type, preferred_date, booking_type, emergency_reason } = req.body;
  const consumer = req.session.consumer;
  const crisis = readData('crisis');

  // Check active booking
  const existingActive = findAll('bookings_lpg', b =>
    b.consumer_id === consumer.id &&
    !['DELIVERED', 'CANCELLED'].includes(b.status)
  );

  if (existingActive.length > 0 && !crisis.rationing_active) {
    req.flash('error', 'You already have an active LPG booking. Cancel it before placing a new one.');
    return res.redirect('/lpg/book');
  }

  const distributor = findOne('distributors', 'id', distributor_id);
  if (!distributor) {
    req.flash('error', 'Invalid distributor selected.');
    return res.redirect('/lpg/book');
  }

  // Determine stock status and confirmation type
  const cylinderCount = distributor.cylinders_14kg || 0;
  let status = 'CONFIRMED';
  let confirmationType = 'INSTANT';
  let expectedConfirmationBy = null;

  if (cylinderCount < 20) {
    status = 'QUEUED';
    confirmationType = 'DELAYED_EXTENDED';
    const eta = new Date();
    eta.setHours(eta.getHours() + 48);
    expectedConfirmationBy = eta.toISOString();
  } else if (cylinderCount < 60) {
    status = 'PENDING';
    confirmationType = 'DELAYED_SHORT';
    const eta = new Date();
    eta.setHours(eta.getHours() + 8);
    expectedConfirmationBy = eta.toISOString();
  }

  const token = generateLPGToken();
  const bookingId = 'LPG-' + Date.now();
  const priorityMap = { P1: 1, P2: 2, P3: 3, P4: 4, P5: 5, P6: 6 };

  const booking = {
    id: bookingId,
    token,
    consumer_id: consumer.id,
    consumer_name: consumer.name,
    consumer_mobile: consumer.mobile,
    consumer_address: consumer.address,
    consumer_pin_code: consumer.pin_code,
    distributor_id: distributor.id,
    distributor_name: distributor.name,
    omc: distributor.omc,
    cylinder_type: cylinder_type || '14.2kg',
    booking_type: booking_type || 'SCHEDULED',
    emergency_reason: emergency_reason || null,
    preferred_date: preferred_date || null,
    priority_level: priorityMap[consumer.priority_category] || 4,
    priority_category: consumer.priority_category,
    status,
    confirmation_type: confirmationType,
    expected_confirmation_by: expectedConfirmationBy,
    delivery_agent: null,
    delivery_agent_mobile: null,
    delivery_otp: String(Math.floor(1000 + Math.random() * 9000)),
    delivery_date_actual: null,
    delivery_time_window: null,
    amount: cylinder_type === '5kg' ? 480 : cylinder_type === '19kg' ? 1850 : 895,
    payment_status: 'PAID',
    payment_method: 'UPI',
    payment_ref: 'UPI-' + Date.now(),
    created_at: new Date().toISOString(),
    confirmed_at: status === 'CONFIRMED' ? new Date().toISOString() : null,
    delivered_at: null,
    empty_cylinder_returned: false,
    rated: false,
    cancellation_reason: null
  };

  insertOne('bookings_lpg', booking);

  if (status === 'CONFIRMED') {
    req.flash('success', `LPG booking confirmed! Token: ${token}. Expected delivery: ${preferred_date || 'Next available slot'}.`);
  } else {
    req.flash('info', `Booking received! Token: ${token}. Stock is limited — confirmation expected by ${new Date(expectedConfirmationBy).toLocaleString('en-IN')}.`);
  }

  res.redirect(`/lpg/track/${bookingId}`);
});

// GET /lpg/track/:bookingId
router.get('/track/:bookingId', requireLogin, (req, res) => {
  const booking = findOne('bookings_lpg', 'id', req.params.bookingId);
  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-lpg');
  }

  const queuePos = getLPGQueuePosition(booking.distributor_id, booking.id);
  const distributor = findOne('distributors', 'id', booking.distributor_id);

  res.render('pages/lpg/track', {
    title: `Track LPG Booking — ${booking.token}`,
    booking,
    queuePos,
    distributor,
    formatDate
  });
});

// POST /lpg/cancel/:bookingId
router.post('/cancel/:bookingId', requireLogin, (req, res) => {
  const booking = findOne('bookings_lpg', 'id', req.params.bookingId);
  if (!booking || booking.consumer_id !== req.session.consumer.id) {
    req.flash('error', 'Booking not found.');
    return res.redirect('/booking/my-lpg');
  }

  if (['DELIVERED', 'CANCELLED', 'OUT_FOR_DELIVERY'].includes(booking.status)) {
    req.flash('error', 'Cannot cancel this booking at this stage.');
    return res.redirect('/booking/my-lpg');
  }

  updateOne('bookings_lpg', req.params.bookingId, {
    status: 'CANCELLED',
    cancellation_reason: req.body.reason || 'Consumer cancelled',
    cancelled_at: new Date().toISOString(),
    refund_amount: booking.amount,
    refund_percent: 100
  });

  req.flash('success', 'LPG booking cancelled. Full refund will be processed within 2 hours.');
  res.redirect('/booking/my-lpg');
});

module.exports = router;
