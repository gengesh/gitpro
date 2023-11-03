const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');


router.post('/expense',expenseController.postExpense);
router.get('/expense',expenseController.getExpense);
router.delete('/delete/:deleteId',expenseController.deleteExpense);
module.exports = router;