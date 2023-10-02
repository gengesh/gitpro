const path = require('path');
const express = require('express');
const sucessController = require('../controller/successs');
const router= express.Router();

router.get('/success',sucessController.getSuccess);


module.exports = router;
