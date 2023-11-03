const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));
const signupRoutes = require('./routes/signup.js');
const loginRoutes = require('./routes/login.js');
const expenseRoutes = require('./routes/expense.js');
app.use(signupRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(4000);
}).catch(err => console.log(err))