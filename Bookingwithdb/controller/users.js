const User = require('../model/users');
// const Product = require('../models/product');
// const cors = require('cors');
// const express = require('express');
// const app = express();
const path = require('path');
// app.use(cors());
// exports.getShop = (req,res,next) => {
//     Product.findAll().then(products => {
//         res.render('shop',{prod:products });
//     }).catch(err => console.log(err));
// };
exports.getUser = async (req,res,next) => {
    const users = await User.findAll();
    res.status(200).json({allUsers:users});
    // .then(users => {
    //     // console.log("total get users:",users[0]);
    //     res.render('index',{users:users});
    // }).catch(err => console.log(err));
}
exports.postUser = async (req,res,next) => {
    console.log("total post users:",req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber =req.body.phonenumber;
   const data = await User.create ({
        name:name,
        email:email,
        phonenumber:phonenumber
       });
       res.status(201).json({newUserDetail: data});
    // User.create ({
    //  name:req.body.name,
    //  email:req.body.email,
    //  phonenumber:req.body.phonenumber
    // }).then( (results) => {
    //     console.log(results);
    //     res.redirect('/');
    // }).catch(err => console.log(err));
}
exports.deleteUser = async (req,res,next) =>{
    const userId = req.params.userId;
    console.log("deleteuserid",userId);
    const user = await User.findByPk(userId)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        console.log('destroyed user');
        res.status(201).json({user:userId});
    })
}

