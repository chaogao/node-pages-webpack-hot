const path = require('path');
const config = require('../config.js');

var webpack = require('webpack'),
  webpackDevConfig = require(path.resolve(config.root, './fe/webpack.config.js'));

var compiler = webpack(webpackDevConfig);

module.exports = compiler;
