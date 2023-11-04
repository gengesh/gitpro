const User = require('../models/users.js');
const jwt = require('jsonwebtoken');


const authenticate = (req,res,next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'gengeswaran');
        console.log("userId>>>>:",user.userId);
        User.findByPk(user.userId).then(user => {
            req.user = user;
            next();
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json();
    }
}
module.exports ={authenticate};