const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('path');
exports.getShop = (req,res,next) =>{
    Product.fetchAll(prod => {
        // console.log("after fetch:",prod);
    res.render('shop',{prod});
    });
    
    // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};
exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId,product => {
       res.render('product-details',{product});
    }); 
}
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        console.log("new:",product);
        Cart.addProduct(prodId,product.price);
    });
    // console.log("post cart:",prodId);
    res.redirect('/cart');
}