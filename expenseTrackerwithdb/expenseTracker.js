// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const cors = require('cors');
app.use(cors());
const ExpenseRoutes = require('./routes/expense')
app.use(bodyParser.json({extended:false}));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(ExpenseRoutes);
sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(4000);
}).catch(err => console.log(err));
    