const path = require('path');
const express = require('express');
// const shopController = require('../controller/shops');
const userController = require('../controller/users');
const router= express.Router();
router.get('/',userController.getUser);
router.post('/',userController.postUser);
router.delete('/delete/:userId',userController.deleteUser);
module.exports = router;
