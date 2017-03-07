'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const winston = require('winston');

const env = process.env.NODE_ENV || 'dev';
const config = require('../config');
const swig = require('swig')
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = require('./webpack');

module.exports = function (app, passport) {
  // local variables for all views
  app.locals.env = env;
  app.locals.reload = true;

  // use webpack and hot realod
  if (env == 'dev') {
    let webpackDevConfig = require(path.resolve(config.root, './fe/webpack.config.js'));

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {
      // public path should be the same with webpack config
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: false,
      stats: {
        colors: true
      }
    }));
    app.use(webpackHotMiddleware(compiler));
  } else {
    app.use('/static', express.static(config.staticRoot));
  }

  // Use winston on production
  let log = 'dev';
  if (env !== 'dev') {
    log = {
      stream: {
        write: message => winston.info(message)
      }
    };
  }

  // check layout exist
  if (env == 'dev') {
    app.use((req, res, next) => {
      let layoutPath = path.join(config.templateRoot, config.layoutTemplate);
      let filename = compiler.outputPath + config.layoutTemplate;

      compiler.outputFileSystem.readFile(filename, function(err, result) {
        let fileInfoLayout = path.parse(layoutPath);

        mkdirp(fileInfoLayout.dir, () => {
          fs.writeFileSync(layoutPath, result);
          next();
        });
      });
    });
  }

  app.use(morgan(log));

  // set templat engine
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', config.templateRoot);
  swig.setDefaults({ cache: false });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  app.use(cookieParser());
};
