const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth');
const { findOne, updateOne } = require('../helpers/storage');

// GET /profile
router.get('/', requireLogin, (req, res) => {
  const fullConsumer = findOne('consumers', 'id', req.session.consumer.id);
  res.render('pages/profile', {
    title: 'My Profile — FuelIndia',
    consumer: fullConsumer || req.session.consumer
  });
});

// POST /profile/vehicle/add
router.post('/vehicle/add', requireLogin, (req, res) => {
  const { rc, type, fuel, brand, year, tank_capacity, preferred_quantity, fuel_preference } = req.body;
  const consumer = findOne('consumers', 'id', req.session.consumer.id);

  if (!rc || !type || !fuel || !brand) {
    req.flash('error', 'RC number, vehicle type, fuel type, and brand are required.');
    return res.redirect('/profile');
  }

  if (consumer.vehicles.length >= 4) {
    req.flash('error', 'Maximum 4 vehicles allowed per account.');
    return res.redirect('/profile');
  }

  const alreadyExists = consumer.vehicles.find(v => v.rc === rc.toUpperCase().trim());
  if (alreadyExists) {
    req.flash('error', 'This vehicle RC is already registered in your garage.');
    return res.redirect('/profile');
  }

  const vehicle = {
    rc: rc.toUpperCase().trim(),
    type,
    fuel,
    brand: brand.trim(),
    year: parseInt(year) || new Date().getFullYear(),
    tank_capacity: parseFloat(tank_capacity) || 0,
    preferred_quantity: parseFloat(preferred_quantity) || 10,
    fuel_preference: fuel_preference || 'Regular'
  };

  consumer.vehicles.push(vehicle);
  updateOne('consumers', consumer.id, { vehicles: consumer.vehicles });

  // Update session
  req.session.consumer.vehicles = consumer.vehicles;

  req.flash('success', `Vehicle ${vehicle.rc} added to your garage.`);
  res.redirect('/profile');
});

// POST /profile/vehicle/remove
router.post('/vehicle/remove', requireLogin, (req, res) => {
  const { rc } = req.body;
  const consumer = findOne('consumers', 'id', req.session.consumer.id);

  consumer.vehicles = consumer.vehicles.filter(v => v.rc !== rc);
  updateOne('consumers', consumer.id, { vehicles: consumer.vehicles });
  req.session.consumer.vehicles = consumer.vehicles;

  req.flash('success', 'Vehicle removed from garage.');
  res.redirect('/profile');
});

// POST /profile/update
router.post('/update', requireLogin, (req, res) => {
  const { name, email, address, city, state, pin_code } = req.body;
  const updates = { name, email, address, city, state, pin_code };

  updateOne('consumers', req.session.consumer.id, updates);

  // Update session
  req.session.consumer.name = name;
  req.session.consumer.city = city;
  req.session.consumer.pin_code = pin_code;

  req.flash('success', 'Profile updated successfully.');
  res.redirect('/profile');
});

module.exports = router;
