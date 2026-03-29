const path = require('path');

// esbuild bundles this file into netlify/functions/server.js,
// so __dirname here = /var/task/consumer-app/netlify/functions/
// We set env vars so app.js and storage.js resolve paths correctly
// regardless of where esbuild places the bundle.
process.env.APP_VIEWS_DIR = path.join(__dirname, '../../views');
process.env.APP_DATA_DIR  = path.join(__dirname, '../../data');

// Explicit requires so esbuild marks these as external (not inlined)
require('ejs');
require('bcryptjs');

const serverless = require('serverless-http');
const app = require('../../app');

module.exports.handler = serverless(app);
