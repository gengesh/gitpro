const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/users.js');
const Expense = require('./models/expenses.js');
const Order = require('./models/premium.js');
const Forgotpassword = require('./models/forgotpassword.js');
const DownloadedFile = require('./models/downloadedfile.js');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));
const signupRoutes = require('./routes/signup.js');
const loginRoutes = require('./routes/login.js');
const expenseRoutes = require('./routes/expense.js');
const premiumRoutes = require('./routes/premium.js');
const leaderboardRoutes = require('./routes/leaderboard.js');
const forgotpasswordRoutes = require('./routes/forgotpassword.js');
app.use(express.urlencoded({ extended: true }));
// const Expense = require('./models/expenses');
app.use(signupRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);
app.use(leaderboardRoutes);
app.use(forgotpasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(User);
sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(4000);
}).catch(err => console.log(err))