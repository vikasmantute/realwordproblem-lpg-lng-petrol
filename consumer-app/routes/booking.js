const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth');
const { findAll, findOne } = require('../helpers/storage');

// GET /booking/my-petrol
router.get('/my-petrol', requireLogin, (req, res) => {
  const consumer = req.session.consumer;
  const bookings = findAll('bookings_petrol', b => b.consumer_id === consumer.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const active = bookings.filter(b => !['CANCELLED', 'COMPLETED', 'NO_SHOW'].includes(b.status));
  const history = bookings.filter(b => ['CANCELLED', 'COMPLETED', 'NO_SHOW'].includes(b.status));

  res.render('pages/booking/my_petrol', {
    title: 'My Petrol Bookings — FuelIndia',
    consumer,
    active,
    history
  });
});

// GET /booking/my-lpg
router.get('/my-lpg', requireLogin, (req, res) => {
  const consumer = req.session.consumer;
  const bookings = findAll('bookings_lpg', b => b.consumer_id === consumer.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const active = bookings.filter(b => !['CANCELLED', 'DELIVERED'].includes(b.status));
  const history = bookings.filter(b => ['CANCELLED', 'DELIVERED'].includes(b.status));

  res.render('pages/booking/my_lpg', {
    title: 'My LPG Bookings — FuelIndia',
    consumer,
    active,
    history
  });
});

// GET /booking/all
router.get('/all', requireLogin, (req, res) => {
  const consumer = req.session.consumer;
  const petrol = findAll('bookings_petrol', b => b.consumer_id === consumer.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const lpg = findAll('bookings_lpg', b => b.consumer_id === consumer.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.render('pages/booking/all', {
    title: 'All Bookings — FuelIndia',
    consumer,
    petrol,
    lpg
  });
});

module.exports = router;
