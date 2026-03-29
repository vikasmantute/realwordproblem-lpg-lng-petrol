const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { findOne, findAll, insertOne } = require('../helpers/storage');
const { redirectIfLoggedIn } = require('../middleware/auth');

// GET /auth/login
router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('pages/auth/login', { title: 'Consumer Login — FuelIndia' });
});

// POST /auth/login
router.post('/login', redirectIfLoggedIn, async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    req.flash('error', 'Mobile number and password are required.');
    return res.redirect('/auth/login');
  }

  const consumer = findOne('consumers', 'mobile', mobile.trim());
  if (!consumer) {
    req.flash('error', 'No account found with this mobile number.');
    return res.redirect('/auth/login');
  }

  const match = await bcrypt.compare(password, consumer.password);
  if (!match) {
    req.flash('error', 'Incorrect password. Please try again.');
    return res.redirect('/auth/login');
  }

  // Store minimal consumer data in session
  req.session.consumer = {
    id: consumer.id,
    name: consumer.name,
    mobile: consumer.mobile,
    email: consumer.email,
    city: consumer.city,
    pin_code: consumer.pin_code,
    priority_category: consumer.priority_category,
    pmuy: consumer.pmuy,
    platform_credit: consumer.platform_credit,
    loyalty_points: consumer.loyalty_points,
    prebooking_suspended: consumer.prebooking_suspended,
    prebooking_suspended_until: consumer.prebooking_suspended_until,
    vehicles: consumer.vehicles || [],
    cylinders: consumer.cylinders || []
  };

  req.flash('success', `Welcome back, ${consumer.name.split(' ')[0]}! 👋`);
  res.redirect('/dashboard');
});

// GET /auth/register
router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('pages/auth/register', { title: 'Create Account — FuelIndia' });
});

// POST /auth/register
router.post('/register', redirectIfLoggedIn, async (req, res) => {
  const { name, mobile, email, password, confirm_password, address, city, state, pin_code, property_type } = req.body;

  // Validations
  if (!name || !mobile || !password || !pin_code) {
    req.flash('error', 'Name, mobile, password, and PIN code are required.');
    return res.redirect('/auth/register');
  }

  if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
    req.flash('error', 'Enter a valid 10-digit mobile number.');
    return res.redirect('/auth/register');
  }

  if (password !== confirm_password) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect('/auth/register');
  }

  if (password.length < 6) {
    req.flash('error', 'Password must be at least 6 characters.');
    return res.redirect('/auth/register');
  }

  const existing = findOne('consumers', 'mobile', mobile);
  if (existing) {
    req.flash('error', 'An account with this mobile number already exists. Please log in.');
    return res.redirect('/auth/login');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newConsumer = {
    id: 'USR' + Date.now(),
    name: name.trim(),
    mobile: mobile.trim(),
    email: email ? email.trim() : '',
    password: hashedPassword,
    aadhaar: '',
    ration_card: '',
    address: address ? address.trim() : '',
    city: city ? city.trim() : '',
    state: state ? state.trim() : '',
    pin_code: pin_code.trim(),
    property_type: property_type || 'Domestic',
    fuel_preferences: [],
    vehicles: [],
    cylinders: [],
    subsidy_bank: '',
    aadhaar_linked: false,
    pmuy: false,
    priority_category: 'P4',
    loyalty_points: 0,
    platform_credit: 0,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    no_show_count: 0,
    prebooking_suspended: false,
    prebooking_suspended_until: null
  };

  insertOne('consumers', newConsumer);

  req.flash('success', 'Account created successfully! Please log in.');
  res.redirect('/auth/login');
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
