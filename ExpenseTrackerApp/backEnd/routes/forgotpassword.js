const express = require('express');
const router = express.Router();
const forgetpasswordController = require('../controllers/forgotpassword.js');
const userAuthentication = require('../middleware/auth.js');

// router.post('/login',loginController.postLogin);
router.post('/password/forgotpassword',userAuthentication.emailcheck,forgetpasswordController.postForgotPassword);
router.get('/password/resetpassword/:forgotemail',forgetpasswordController.emailverification);
// router.post('/password/newpassword',forgetpasswordController.passwordupdate);
router.post('/password/resetpassword/:requestId',forgetpasswordController.passwordupdate);
module.exports = router;