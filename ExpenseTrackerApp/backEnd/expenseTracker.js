const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/users.js');
const Expense = require('./models/expenses.js');
const Order = require('./models/premium.js');
const Forgotpassword = require('./models/forgotpassword.js');
const DownloadedFile = require('./models/downloadedfile.js');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a' }
);
const cors = require('cors');
const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));
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
// app.use((req,res) => {
//     console.log("urlllll;:",req.url)
//     res.sendFile(path.join(__dirname,`../frontEnd/${req.url}`));
// })
app.use((req, res, next) => {
    // Allow scripts from 'self' and the Axios CDN
    req.url1 = req.url;
    res.setHeader('Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com https://checkout.razorpay.com;"); 

    // Continue to the next middleware
    next();
});

// Serve static files from the frontEnd directory
app.use((req, res) => {
    console.log("urlllll;:", req.url1);
    res.sendFile(path.join(__dirname, `../frontEnd/${req.url1}`));
});
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
    app.listen(process.env.PORT || 4000);
}).catch(err => console.log(err))