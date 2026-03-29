const express = require('express');
const router = express.Router();
const { readData, findAll } = require('../helpers/storage');

// GET / — Public Homepage
router.get('/', (req, res) => {
  const pumps = readData('pumps');
  const distributors = readData('distributors');
  const crisis = readData('crisis');

  // Stats for public homepage
  const highStockPumps = pumps.filter(p => p.stock_level === 'High').length;
  const totalPumps = pumps.length;

  res.render('pages/index', {
    title: 'FuelIndia — Real-Time Fuel Ecosystem',
    pumps,
    distributors,
    crisis,
    highStockPumps,
    totalPumps
  });
});

// GET /about
router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About — FuelIndia' });
});

module.exports = router;
