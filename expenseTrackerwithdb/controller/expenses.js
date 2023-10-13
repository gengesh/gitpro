const Expense = require('../model/expense');
const path = require('path');
exports.getExpense = async (req,res,next) => {
    console.log("this is getexpense page");
    const expenses = await Expense.findAll();
    res.status(200).json({allExpenses:expenses});
}
exports.postExpense = async (req,res,next) => {
    console.log("total post expenses:",req.body);
    const amount = req.body.amount;
    const description = req.body.description;
    const category =req.body.category;
   const data = await Expense.create ({
        amount:amount,
        description:description,
        category:category
       });
       res.status(201).json({newExpenseDetails: data});
}
exports.deleteExpense = async (req,res,next) =>{
    const expenseId = req.params.expenseId;
    console.log("deleteuserid",expenseId);
    const expense = await Expense.findByPk(expenseId)
    .then(expense => {
        return expense.destroy();
    })
    .then(result => {
        console.log('destroyed expense');
        res.status(201).json({expense:expenseId});
    })
}
exports.putExpense = async (req,res,next) => {
    // const expenseId = req.params.expenseId;
    console.log("put body:",req.body);
    
   const up = await Expense.update(req.body, {
        where: { id: req.body.id }
      }).then(() => {
        res.status(200).json({ message: 'Resource updated successfully' });
      }).catch((error) => {
        console.error('Error updating resource:', error);
        res.status(500).json({ error: 'An error occurred while updating the resource' });
      });
}
