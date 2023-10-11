// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const cors = require('cors');
app.use(cors());
const userRoutes = require('./routes/user')
// const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop');

// const contactRoutes = require('./routes/contact');
// const successRoutes = require('./routes/success');
// const errorController = require('./controller/err');
app.use(bodyParser.json({extended:false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(userRoutes);

// app.use(shopRoutes); 
// app.use('/admin',contactRoutes);
// app.use('/admin',successRoutes);
// app.use(errorController.getError);
// const server = http.createServer(app);
sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(5000);
}).catch(err => console.log(err));
    