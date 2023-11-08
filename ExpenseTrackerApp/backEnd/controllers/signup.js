const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const sequelize = require('../util/database.js');


exports.postSignup = async (req,res,next) => {
    const t = await sequelize.transaction();
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
   
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(password,salt,async(err,hash) =>{
            if(err){
                res.status(500).json({success:false,info:"something went wrong!"});
            }else{
                 try{
     const user = await Users.create({
        name:name,
        email:email,
        password:hash,
    },
    {transaction:t})  
    await t.commit();
     res.status(201).json({info:"successfully created."});
    }catch (error) {
        await t.rollback();
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(409).json({ info: "Email ID already exists!" }); // 409 Conflict status code for duplicate data
        } else {
          res.status(500).json({ info: "Internal Server Error" }); // Handle other errors
        }
        
    }
            }
        })
    })


}
