let express = require('express');
let router = express.Router();

let userCtr = require('../../app/controllers/user');

router.get('/login', userCtr.login);

module.exports = router;
