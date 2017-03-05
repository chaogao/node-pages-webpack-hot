'use strict';

const path = require('path');

const env = process.env.ENV_NODE || 'dev';


module.exports = {
  root: path.join(__dirname, '..'),
  templateRoot: env == 'dev' ? path.join(__dirname, '..', 'fe', 'dist_tmp') : path.join(__dirname, '..', 'fe', 'dist'),
  layoutTemplate: 'templates/page/base/base.html'
};
