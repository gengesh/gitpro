const path = require('path');
const express = require('express');
const shopController = require('../controller/shops');
const router= express.Router();

router.get('/',shopController.getShop);
router.get('/admin/product/:productId',shopController.getProduct);
router.post('/cart',shopController.postCart);
module.exports = router;
