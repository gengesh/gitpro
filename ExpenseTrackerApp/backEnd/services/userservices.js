
const Expenses = require('../models/expenses.js')

const getExpenses = async(req) => {
       const expenses = await Expenses.findAll({
            where:{UserId:req.user.id}
        })
        return expenses;
}
module.exports = {
    getExpenses
}