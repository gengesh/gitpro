const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('path');
exports.getShop = (req,res,next) => {
    Product.fetchAll()
    .then(([rows,fieldData]) => {
    res.render('shop',{prod:rows });
    }).catch(err => console.log(err));
    // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};
exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(([product] ) => {
        console.log(product);
        res.render('product-details',{product:product[0]});
    }).catch(err => console.log(err));
}
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId,product.title,product.price);

    });
    Cart.fetchAll(prod => {
        res.render('cart',{prod});
    });
    // console.log("post cart:",prodId);
    // res.redirect('/cart');
}
exports.getCart = (req,res,next) => {
    Cart.fetchAll(prod => {
        res.render('cart',{prod});
    });
}