/**
 * Middleware: Protect routes — consumer must be logged in.
 */
function requireLogin(req, res, next) {
  if (req.session.consumer) return next();
  req.flash('error', 'Please log in to access this page.');
  res.redirect('/auth/login');
}

/**
 * Middleware: If already logged in, redirect away from login/register pages.
 */
function redirectIfLoggedIn(req, res, next) {
  if (req.session.consumer) return res.redirect('/dashboard');
  next();
}

/**
 * Middleware: Check if pre-booking is suspended for this consumer.
 */
function checkPrebookingSuspension(req, res, next) {
  const consumer = req.session.consumer;
  if (!consumer) return next();

  if (consumer.prebooking_suspended) {
    const until = consumer.prebooking_suspended_until
      ? new Date(consumer.prebooking_suspended_until)
      : null;

    if (!until || until > new Date()) {
      req.flash('error', `Your pre-booking privilege is suspended${until ? ` until ${until.toLocaleDateString('en-IN')}` : ''}. This happens after repeated no-shows.`);
      return res.redirect('/dashboard');
    }
  }
  next();
}

module.exports = { requireLogin, redirectIfLoggedIn, checkPrebookingSuspension };
