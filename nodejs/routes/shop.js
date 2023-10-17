const path = require('path');
const express = require('express');
const shopController = require('../controller/shops');
const router= express.Router();

router.get('/',shopController.getShop);
router.get('/admin/product/:productId',shopController.getProduct);
router.post('/cart',shopController.postCart);
router.get('/cart',shopController.getCart);
router.get('/cart/delete/:productId',shopController.postCartDeleteProduct);
module.exports = router;
