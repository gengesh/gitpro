const http = require('http');
const express = require('express');
const app = express();
app.use((req,res,next) =>{
    console.log("in the Middleware");
    next();//allows the request to continue to the next middleware in line
});
app.use((req,res,next) =>{
    console.log("in another Middleware");

    res.send("<h1>Hello form Express!</h1>");
});
const server = http.createServer(app);
    server.listen(4000);