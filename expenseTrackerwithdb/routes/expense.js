// const path = require('path');
const express = require('express');
// const shopController = require('../controller/shops');
const expenseController = require('../controller/expenses');
const router= express.Router();
router.get('/',expenseController.getExpense);
router.post('/',expenseController.postExpense);
router.put('/update',expenseController.putExpense);
router.delete('/delete/:expenseId',expenseController.deleteExpense);
module.exports = router;
