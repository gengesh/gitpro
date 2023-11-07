const express = require('express');
const userAuthentication = require('../middleware/auth.js');
const router = express.Router();
const leaderController = require('../controllers/leaderboard.js');


// router.post('/expense',userAuthentication.authenticate,expenseController.postExpense);
router.get('/premium/leaderboard',userAuthentication.authenticate,leaderController.showLeaderboard);
// router.delete('/delete/:deleteId',userAuthentication.authenticate,expenseController.deleteExpense);
module.exports = router;