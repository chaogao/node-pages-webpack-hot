var userRouter = require('./routes/user');
var homeCtr = require('../app/controllers/home');

// inject all router
module.exports = function (app) {
  app.use('/user', userRouter);

  app.get('/', homeCtr);
};
