const Users = require('../models/users.js');


exports.postSignup = async (req,res,next) => {
    console.log("this is constroller req",req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    await Users.create({
        name:name,
        email:email,
        password:password,
    })
    .then(response =>{
        res.status(201).json({info:"successfully created."});
    })
    .catch(err => {
        res.status(200).json({info:"email id already exists!"});
    });
    
}