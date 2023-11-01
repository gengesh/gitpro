const Users = require('../models/users.js');


exports.postLogin = async (req,res,next) => {
    console.log("this is constroller req",req.body);
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({
       where:{email:email},
    })
    .then((response) =>{
        if(response){
           if(response.password == password){
            res.status(200).json({message:"200"});
           }else{
            res.status(200).json({message:"401"});
           }
        }else{
            res.status(200).json({message:"404"});
        }
    })
    .catch(err => {
       console.log(err);
    });
    
}