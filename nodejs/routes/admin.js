
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admins');
// /admin/add-product => GET
router.get('/add-product',adminController.getAdmin);
router.post('/add-product',adminController.postAdmin);
router.get('/',adminController.getAdminMain);
router.get('/edit-product/:productId',adminController.getEditProduct);
router.post('/edit-product',adminController.postEditProduct);
router.get('/delete/:productId',adminController.getDeleteProduct)
module.exports = router;