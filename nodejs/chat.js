const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// const LocalStorage = require('node-localstorage').LocalStorage,
//   localStorage = new LocalStorage('./scratch');
app.use(bodyParser.urlencoded({extended:false}));
const login = require('./chatApp/login');
const message = require('./chatApp/messages');
app.use(login);
app.use(message);


app.listen(5000);