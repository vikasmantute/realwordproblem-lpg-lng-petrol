const express = require('express');
const router = express.Router();
const { readData } = require('../helpers/storage');

// GET /cng/stations — public CNG station finder
router.get('/stations', (req, res) => {
  res.render('pages/cng/stations', {
    title: 'CNG Stations — FuelIndia',
    crisis: readData('crisis')
  });
});

module.exports = router;
