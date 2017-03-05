'use strict';

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 8080;
const app = express();

// Bootstrap routes
require('./config/express')(app);
require('./config/routes')(app);

var reload = require('reload');
var http = require('http');

function listen () {
  if (app.get('env') === 'test') return;

  var server = http.createServer(app);

  reload(server, app);

  server.listen(port, () => {
    console.log('Express app started on port ' + port);
  });
}

listen();
