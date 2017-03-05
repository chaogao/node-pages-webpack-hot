const util = require('../../util');

let list = (req, res) => {
  util.render(res, 'templates/page/users/list/list.html');
}

module.exports = {
  list
};
