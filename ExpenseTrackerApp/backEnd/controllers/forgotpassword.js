const path = require('path');
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
const Forgotpassword = require('../models/forgotpassword.js');
require('dotenv').config();






    exports.postForgotPassword = async (req,res,next) => {
        const emailId = req.body.emailId;

       const forgotpasswordrequest =  await Forgotpassword.create({
          UserId:req.user.id,
        })

        // console.log("forgotpasswordrequest >>>>>>:",forgotpasswordrequest);

        const client = Sib.ApiClient.instance;

       client.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email:process.env.SENDINBLUE_SENDER_MAILID,
        name:process.env.SENDINBLUE_SENDER_NAME,
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
        textContent:`please click below the link to reset your password`,
        htmlContent:`<h4>Expense Tracker</h4>
        <a href="http://localhost:4000/password/resetpassword/${forgotpasswordrequest.id}">forgot password link</a>`
      }).then(response => {
        res.status(200).json({message:"email verification sent"});
        
      })
      .catch(err => {
        console.log(err);
        
      })   
    }

    exports.emailverification = async (req,res,next) => {
      const requestId = req.params.forgotemail;
      console.log("requestId",requestId);
      try{
        const forgotrequest = await Forgotpassword.findOne({
          where:{
            id:requestId,
          }
        })
        if(forgotrequest){
          await forgotrequest.update({
            isactive:true,
          })
        }
        const absolutePath = path.join(__dirname, '../../frontEnd/resetpassword/resetpassword.htm');
        res.sendFile(absolutePath);
        // res.json({forgotrequest});
      }catch(err){
        console.log(err);
        res.status(401).json({message:"email verification error"})
      }
      
    }

    exports.passwordupdate = async (req,res,next) => {
      const requestId = req.params.requestId;
      console.log("enter into update",requestId);
      console.log("req is :",req.body.newpassword);
      const newpassword = req.body.newpassword;
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newpassword,salt,async(err,hash) =>{
            if(err){
                res.status(500).json({success:false,info:"something went wrong!"});
            }else{
                 try{
                  const forgotrequest = await Forgotpassword.findOne({
                    where:{
                      id:requestId,
                    }
                  })
                  if(forgotrequest){
                    await forgotrequest.update({
                      isactive:false,
                    })
                  const user = await Users.findOne({
                    where:{
                      id:forgotrequest.UserId,
                    }
                  })
                  if(user){
                 await user.update({
                    password:hash,
                  })
                }
     res.status(201).json({info:"successfully password updated."});
    }
  }catch (error) {
       res.status(401).json({info:"this is error after updating password"})
  }  
    }
  })
})
}