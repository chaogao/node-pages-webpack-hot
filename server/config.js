'use strict';

const path = require('path');

const env = process.env.NODE_ENV || 'dev';

module.exports = {
  env: env,
  root: path.join(__dirname, '..'),
  staticRoot: env == 'dev' ? '' : path.join(__dirname, '..', 'fe', 'dist', 'static'),
  templateRoot: env == 'dev' ? path.join(__dirname, '..', 'fe', 'dist_tmp') : path.join(__dirname, '..', 'fe', 'dist'),
  layoutTemplate: 'templates/page/base/base.html'
};
