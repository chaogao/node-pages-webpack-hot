let express = require('express');
let router = express.Router();

let usersCtr = require('../../app/controllers/users');

router.get('/list', usersCtr.list);

module.exports = router;
