
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admins');
// /admin/add-product => GET
router.get('/add-product',adminController.getAdmin);
router.post('/add-product',adminController.postAdmin);

module.exports = router;