const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/users.js');
const Expense = require('./models/expenses.js');
const Order = require('./models/premium.js');


const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));
const signupRoutes = require('./routes/signup.js');
const loginRoutes = require('./routes/login.js');
const expenseRoutes = require('./routes/expense.js');
const premiumRoutes = require('./routes/premium.js');
// const Expense = require('./models/expenses');
app.use(signupRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(4000);
}).catch(err => console.log(err))