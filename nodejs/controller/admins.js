const Product = require('../models/product');
const path = require('path');
const fs = require('fs');
exports.getAdmin = (req,res,next) =>{
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    res.render('edit-product',{editing:false});
};
// /admin/add-product => POST
exports.postAdmin = (req,res,next) => {
    req.user
    .createProduct({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description
     })
     .then( (results) =>{
// console.log(results);
res.redirect('/');
}).catch( err => console.log(err));
}
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id:prodId}})
     .then(products => {
        const product = products[0];
        if(!product){
            return res.redirect('/');
        }
        res.render('edit-product',{product:product,editing:editMode});
    });
    
}
exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId,updatedtitle,updatedPrice,updatedDesc);
    console.log("postEditProduct",prodId);
    updatedProduct.save();
    res.redirect('/admin');
}
exports.getAdminMain = (req,res,next) =>{
    req.user
    .getProducts()
    .then(products => {
        res.render('admin',{prod:products });
    }).catch(err => console.log(err));
    // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};
exports.getDeleteProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.remainingFindById(prodId).then(([rows,filedData]) =>{
        // res.render('admin',{prod:rows});
        res.redirect('/admin');
    }).catch(err => {
        return res.redirect('/');
        });
}