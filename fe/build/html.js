const glob = require('glob');
const path = require('path');
const entry = require('./entry');
const config = require('./conf.js').CONFIG_BUILD;
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entrys = entry();

let createHTMLPlugin = () => {
  let htmls = [];

  // get all templates
  let files = glob.sync(config.src + '/**/*.' + config.ext);
  let srcLength = config.src.length;

  files.forEach(function (_file) {
    let file = path.parse(_file);

    let chunks = [];
    let chunkName = config.staticRoot + file.dir.slice(srcLength) + '/' + file.name;

    // if has same name entry, create a html plugin
    let c = entrys[chunkName];
    c && chunks.push(chunkName);

    // layout will contains common chunk
    if (file.name == config.serverLayoutName) {
      chunks.push(config.staticRoot + '/common');
    }

    let plugin = new HtmlWebpackPlugin({
      filename: config.templateRoot + file.dir.slice(srcLength) + '/' + file.base,
      template: path.resolve(file.dir, file.base),
      chunks: chunks,
      inject: false
    });

    htmls.push(plugin);
  });

  return htmls;
}

module.exports = createHTMLPlugin;
