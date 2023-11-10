const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.js');


router.post('/login',loginController.postLogin);
// router.post('/password/forgotpassword',loginController.postForgotPassword);
module.exports = router;