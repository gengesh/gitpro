const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.js');


router.post('/signup',signupController.postSignup);

module.exports = router;