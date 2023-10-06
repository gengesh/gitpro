const fs = require('fs');
const path = require('path');
module.exports = class Cart {
    static addProduct(id,title,productPrice){
    //Fetch the previous cart
    fs.readFile('data/cart.json','utf8', (err,data) => {
        let cart = { products: [], totalPrice: 0 };
        if(!err){
            try{
                cart = JSON.parse(data);
            }catch(parseError){
                cart = { products: [], totalPrice: 0 };
            }   
        }
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        if(existingProduct){
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex]=updatedProduct;
        }else {
            updatedProduct = {id:id,title:title,price:productPrice,qty:1};
            cart.products = [...cart.products,updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile('data/cart.json',JSON.stringify(cart), err => {
            console.log(err);
        });
    });
    //Analyze the cart => Find existing product
    //Add new product/ increase quantity.
    }
    static fetchAll(cb){
        fs.readFile('data/cart.json','utf8', (err,data) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err){
                try{
                    cb(JSON.parse(data));
                }catch(parseError){
                    cart = { products: [], totalPrice: 0 };
                    cb(cart);
                }   
            }
    });
}
    
}