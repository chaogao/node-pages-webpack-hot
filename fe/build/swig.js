function SwigScript (options) {}
 SwigScript.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      var scriptStr = '';
      var styleStr = '';

      if (htmlPluginData.assets.js) {
        htmlPluginData.assets.js.forEach(function (item) {
          scriptStr+= '<script src="' + item + '"></script>'
        });
      }

      if (htmlPluginData.assets.css) {
        htmlPluginData.assets.css.forEach(function (item) {
          styleStr+= '<link rel="stylesheet" href="' + item + '"/>';
        });
      }

      if (/\<\!--webpack_style_placeholder--\>/.test(htmlPluginData.html)) {
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_style_placeholder-->', styleStr);
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_script_placeholder-->', scriptStr);
      } else {
        htmlPluginData.html = htmlPluginData.html.replace('<!--webpack_script_placeholder-->', scriptStr + styleStr);
      }
      callback(null, htmlPluginData);
    });
  });

};

module.exports = SwigScript;
