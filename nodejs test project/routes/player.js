const express = require('express');
const playerController = require('../controller/player');
const router= express.Router();
router.get('/',playerController.getPlayer);
router.post('/',playerController.postPlayer);
router.post('/search',playerController.postSearch);
router.post('/edit',playerController.postEdit);
router.put('/update',playerController.updatePlayer);
module.exports = router;
