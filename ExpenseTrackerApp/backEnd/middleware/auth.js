const User = require('../models/users.js');
const jwt = require('jsonwebtoken');


const authenticate = async (req,res,next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'gengeswaran');
        console.log("userId>>>>:",user.userId);
       const user1 =  await User.findByPk(user.userId)
            req.user = user1;
            next();
    }
    catch(err){
        // console.log(err);
        return res.status(401).json({"success":"false"});
    }
}

const emailcheck = async (req,res,next)  => {
    try {
        console.log("this is emailcheck");
    const user = await User.findOne({
        where:{
        email:req.body.emailId,
        }
    })
    if(user){
        req.user = user;
        next(); 
    } else {
        return res.status(401).json({messasge:"email address not registered!"});
    }
    }catch(err){
        console.log(err);
        return res.status(401).json({messasge:"email address not registered!"});
    }
}
module.exports ={authenticate,emailcheck};