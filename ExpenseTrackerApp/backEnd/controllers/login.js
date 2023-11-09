const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();




function generateAccessToken(id,name) {
    return jwt.sign({userId:id,name:name},'gengeswaran');
}
exports.postLogin = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
         const user = await Users.findOne({
            where:{email:email},
         })
           if(user){
                const passwordMatch = await bcrypt.compare(password,user.password);
                if(passwordMatch){
                    res.status(200).json({message:"login successfully",token:generateAccessToken(user.id,user.name)});
                }else{
                     res.status(401).json({message:"password incorrect!"});
                 }
                }else{
                     res.status(404).json({message:"email id not found!"});
                    }
                }catch(err) {
                    console.log(err);
                 res.status(500).json({message:"something went wrong!"});
             }
      
    }

    exports.postForgotPassword = async (req,res,next) => {
        const emailId = req.body.emailId;
        console.log("email id is :",emailId);

        const client = Sib.ApiClient.instance;

       client.authentications['api-key'].apiKey = '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';

      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email:'gengeswarancse11@gmail.com',
        name:'gengeswaran',
      }

      const receivers = [
        {
            email:emailId,
        },
      ]

      tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'forgot password reset:',
        textContent:`please click below the link to reset your password`
      }).then(response => {
        res.status(200).json({message:"checking"});
      })
      .catch(err => {
        console.log(err);
      })



        
    }