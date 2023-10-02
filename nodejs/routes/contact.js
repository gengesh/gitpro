const path = require('path');
const express = require('express');
const contactController = require('../controller/contacts');
const router= express.Router();

router.get('/contactus',contactController.getContact);


module.exports = router;
