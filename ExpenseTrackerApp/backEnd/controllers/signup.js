const Users = require('../models/users.js');
const bcrypt = require('bcrypt');

exports.postSignup = async (req,res,next) => {
    console.log("this is constroller req",req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password,salt,async(err,hash) =>{
            if(err){
                res.status(500).json({success:false,message:"something went wrong!"});
            }else{
               
    await Users.create({
        name:name,
        email:email,
        password:hash,
    })
    .then(response =>{
        res.status(201).json({info:"successfully created."});
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({info:"email id already exists!"});
    });
            }
        })
    })


    
}