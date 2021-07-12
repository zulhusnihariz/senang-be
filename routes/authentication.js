var express = require('express');
var router = express.Router();
var authenticationController = require('../controllers/authentication-controller');

// REGISTER
router.post('/register', authenticationController.register);

// LOGIN
router.post('/login', authenticationController.login);

// CHANGE PASSWORD
router.post('/password', authenticationController.changePassword);

module.exports = router;
