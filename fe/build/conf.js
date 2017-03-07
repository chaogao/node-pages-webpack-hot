const path = require('path');
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

const CONFIG_BUILD = {
  env: env,
  ext: 'html', // tempate ext
  src: path.resolve(__dirname, '../src'), // source code path
  path: env == 'dev' ? '/' : path.resolve(__dirname, '../dist'), // base output path
  templateRoot: 'templates', // tempate output path
  staticRoot: 'static', // static output path
  serverLayoutName: 'base', // swig layout name , only one file
  publicPath: env == 'dev' ? ('http://localhost:' + port + '/') : '/'
}

const setConf = function (option) {
  Object.assign(CONFIG_BUILD, option);
}

module.exports = {
  CONFIG_BUILD,
  setConf
}
