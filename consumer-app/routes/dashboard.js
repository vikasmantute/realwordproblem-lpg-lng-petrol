const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth');
const { findAll, findOne, readData } = require('../helpers/storage');

// GET /dashboard
router.get('/', requireLogin, (req, res) => {
  const consumer = req.session.consumer;

  const petrolBookings = findAll('bookings_petrol', b =>
    b.consumer_id === consumer.id && !['CANCELLED', 'DELIVERED', 'COMPLETED'].includes(b.status)
  );

  const lpgBookings = findAll('bookings_lpg', b =>
    b.consumer_id === consumer.id && !['CANCELLED', 'DELIVERED'].includes(b.status)
  );

  const recentPetrolBookings = findAll('bookings_petrol', b =>
    b.consumer_id === consumer.id
  ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  const crisis = readData('crisis');

  // Summary stats
  const allPetrolBookings = findAll('bookings_petrol', b => b.consumer_id === consumer.id);
  const thisMonthLitres = allPetrolBookings
    .filter(b => {
      const d = new Date(b.created_at);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && b.status === 'COMPLETED';
    })
    .reduce((sum, b) => sum + (b.quantity_litres || 0), 0);

  res.render('pages/dashboard', {
    title: 'My Dashboard — FuelIndia',
    consumer,
    petrolBookings,
    lpgBookings,
    recentPetrolBookings,
    crisis: require('../data/crisis.json'),
    thisMonthLitres
  });
});

module.exports = router;
