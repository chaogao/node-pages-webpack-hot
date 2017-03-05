const config = require('./conf.js').CONFIG_BUILD;

const ExtractTextPlugin = require("extract-text-webpack-plugin");

let createRules = function (extractInstance) {
  // dev need support hot module
  if (config.env == 'dev') {
    var stylusLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'stylus-loader'
      }
    ];

    var cssLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      }
    ];
  } else {
    var stylusLoader = extractInstance.extract(['css-loader', 'stylus-loader']);
    var cssLoader = extractInstance.extract(['css-loader']);
  }


  var rules = [
    {
      test: /\.styl$/,
      exclude: /node_modules/,
      use: stylusLoader
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssLoader
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }
    },
    {
      test: /\.tpl$/,
      exclude: /node_modules/,
      use: {
        loader: 'raw-loader'
      }
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf|swf)\??.*$/,
      exclude: /node_modules/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: config.staticRoot + '/assets_url/[name].[hash:7].[ext]'
        }
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }
  ];

  return rules;
}

module.exports = createRules;
