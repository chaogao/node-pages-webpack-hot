const util = require('../util');

module.exports = (req, res) => {
  util.render(res, 'templates/page/home/home.html');
}
