// Explicit requires so esbuild registers these as external deps
require('ejs');
require('bcryptjs');

const serverless = require('serverless-http');
const app = require('../../app');

module.exports.handler = serverless(app);
