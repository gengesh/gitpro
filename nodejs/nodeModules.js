// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact');
const successRoutes = require('./routes/success');
const errorController = require('./controller/err');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes); 
app.use('/admin',contactRoutes);
app.use('/admin',successRoutes);

app.use(errorController.getError);
// const server = http.createServer(app);
    app.listen(4000);