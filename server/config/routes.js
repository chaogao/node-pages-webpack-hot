var usersRouter = require('./routes/users');
var homeCtr = require('../app/controllers/home');

// inject all router
module.exports = function (app) {
  app.use('/users', usersRouter);

  app.get('/', homeCtr);
};
