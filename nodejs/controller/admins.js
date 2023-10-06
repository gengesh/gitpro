const Product = require('../models/product');
const path = require('path');
const fs = require('fs');
exports.getAdmin = (req,res,next) =>{
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    res.render('edit-product',{editing:false});
};
// /admin/add-product => POST
exports.postAdmin = (req,res,next) => {
    console.log(req.body);
    const product = new Product(null,req.body.title,req.body.price,req.body.description);
    product.save();
    res.redirect('/');
}
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    console.log("this is editMode:",editMode);
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
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
    Product.fetchAll(prod => {
    res.render('admin',{prod});
    });
    
    // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};
exports.getDeleteProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.remainingFindById(prodId,product => {
     if(!product){
        return res.redirect('/');
     }
     const jsonString = JSON.stringify(product);
     fs.writeFile('data/data.json',jsonString,(err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('JSON data has been written to the file.');
        }
});
res.redirect('/admin');
    })
}