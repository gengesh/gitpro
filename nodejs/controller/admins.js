const Product = require('../models/product');
const path = require('path');
exports.getAdmin = (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
};
// /admin/add-product => POST
exports.postAdmin = (req,res,next) => {
    console.log(req.body);
    const product = new Product(req.body.title,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
}