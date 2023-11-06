const express = require('express');
const userAuthentication = require('../middleware/auth.js');
const router = express.Router();
const premiumController = require('../controllers/premium.js');


router.get('/purchase/premiummembership',userAuthentication.authenticate,premiumController.purchasePremium);
router.post('/purchase/updatetransactionstatus',userAuthentication.authenticate,premiumController.updateTransactionStatus);
router.post('/purchase/paymentfailed',userAuthentication.authenticate,premiumController.failedTransaction);
module.exports = router;