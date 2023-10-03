const Product = require('../models/product');
const path = require('path');
exports.getShop = (req,res,next) =>{
    Product.fetchAll(prod => {
        console.log("after fetch:",prod);
    res.render('shop',{prod});
    });
    
    // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};