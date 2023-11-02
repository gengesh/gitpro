const Users = require('../models/users.js');
const bcrypt = require('bcrypt');

exports.postLogin = async (req,res,next) => {
    console.log("this is constroller req",req.body);
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({
       where:{email:email},
    })
    .then((response) =>{
        if(response){
           bcrypt.compare(password,response.password,(err,result) =>{
            if(err){
                res.status(200).json({message:"404"});
            }else if(result){
                res.status(200).json({message:"200"});
            }else{
                res.status(200).json({message:"401"});
               }
           }) 
           }else{
            res.status(200).json({message:"404"});
           }
        })
        .catch(err =>{
            res.status(500).json({message:"something went wrong!"});
        })
    
}