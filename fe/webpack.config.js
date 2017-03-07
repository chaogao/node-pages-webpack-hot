const webpack = require('webpack');
const minimist = require('minimist');
const conf = require('./build/conf.js');
const entry = require('./build/entry.js');
const html = require('./build/html.js');
const rules = require('./build/rules.js');
const swigPlugin = require('./build/swig.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

console.info('config is:\n--------------\n', conf.CONFIG_BUILD, '\n--------------');

// generate htmlPlugins
var htmlPlugins = html();
var webpackPlugins = [];
webpackPlugins = webpackPlugins.concat(htmlPlugins);

webpackPlugins.push(
  new CommonsChunkPlugin({
    name: conf.CONFIG_BUILD.staticRoot + '/common',
    minChunks: 2
  })
);

webpackPlugins.push(
  new swigPlugin()
);

webpackPlugins.push(
  new webpack.NoEmitOnErrorsPlugin()
);

if (conf.CONFIG_BUILD.env == 'prod') {
  webpackPlugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  );
}

if (conf.CONFIG_BUILD.env == 'dev') {
  webpackPlugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

// generate rules
var cssExtract = new ExtractTextPlugin('[name].css');
var defaultRules = rules(cssExtract);
webpackPlugins.push(cssExtract);

var webpackRules = [];
webpackRules = webpackRules.concat(defaultRules);

var webpackConfig = {
  entry: entry(),

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: conf.CONFIG_BUILD.env == 'dev' ? 'source-map' : false,

  cache: conf.CONFIG_BUILD.env == 'dev' ? true : false,

  output: {
    path: conf.CONFIG_BUILD.path,
    filename: "[name].js",
    publicPath: conf.CONFIG_BUILD.publicPath
  },

  plugins: webpackPlugins,

  module: {
    rules: webpackRules
  }
};

module.exports = webpackConfig;
