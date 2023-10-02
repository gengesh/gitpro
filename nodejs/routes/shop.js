const path = require('path');
const express = require('express');
const shopController = require('../controller/shops');
const router= express.Router();

router.get('/',shopController.getShop);

module.exports = router;
