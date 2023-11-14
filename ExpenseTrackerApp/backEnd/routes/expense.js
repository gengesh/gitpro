const express = require('express');
const userAuthentication = require('../middleware/auth.js');
const router = express.Router();
const expenseController = require('../controllers/expense.js');


router.post('/expense',userAuthentication.authenticate,expenseController.postExpense);
router.get('/expense',userAuthentication.authenticate,expenseController.getExpense);
router.get('/expense/downloadfile',userAuthentication.authenticate,expenseController.getexpensedownload);
router.delete('/delete/:deleteId',userAuthentication.authenticate,expenseController.deleteExpense);
module.exports = router;