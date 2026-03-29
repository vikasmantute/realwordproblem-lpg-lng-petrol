const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ───────────────────────────────────────────────
// APP_VIEWS_DIR is set by netlify/functions/server.js when running serverless
// so __dirname-based path works in both local dev and Netlify
app.set('view engine', 'ejs');
app.set('views', process.env.APP_VIEWS_DIR || path.join(__dirname, 'views'));

// ─── Static Files ──────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Body Parser ───────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ─── Session ───────────────────────────────────────────────────
app.use(session({
  secret: 'fuelEcoSystemSecretKey2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// ─── Flash Messages ────────────────────────────────────────────
app.use(flash());

// ─── Global Template Variables ─────────────────────────────────
app.use((req, res, next) => {
  res.locals.consumer = req.session.consumer || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  next();
});

// ─── Routes ────────────────────────────────────────────────────
const indexRoutes    = require('./routes/index');
const authRoutes     = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const petrolRoutes   = require('./routes/petrol');
const lpgRoutes      = require('./routes/lpg');
const cngRoutes      = require('./routes/cng');
const profileRoutes  = require('./routes/profile');
const bookingRoutes  = require('./routes/booking');

app.use('/',          indexRoutes);
app.use('/auth',      authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/petrol',    petrolRoutes);
app.use('/lpg',       lpgRoutes);
app.use('/cng',       cngRoutes);
app.use('/profile',   profileRoutes);
app.use('/booking',   bookingRoutes);

// ─── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('pages/404', { title: '404 — Page Not Found' });
});

// ─── Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    title: 'Server Error',
    message: err.message
  });
});

// ─── Export app for Netlify / serverless ───────────────────────
module.exports = app;

// ─── Start Server (local only) ─────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n⛽ Fuel Ecosystem Consumer App`);
    console.log(`   Running at: http://localhost:${PORT}`);
    console.log(`   Mode: Development\n`);
  });
}
