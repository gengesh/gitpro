const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('path');
exports.getShop = (req,res,next) => {
    Product.findAll().then(products => {
        res.render('shop',{prod:products });
    }).catch(err => console.log(err));
    // Product.fetchAll()
    // .then(([rows,fieldData]) => {
    // res.render('shop',{prod:rows });
    // }).catch(err => console.log(err));
    // // res.sendFile(path.join(__dirname,'../','views','shop.ejs'));
};
exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId).then((product) => {
        // console.log(product);
        res.render('product-details',{product:product});
    }).catch(err => console.log(err));
}
exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    let fetchedCart;
     let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: { id:prodId}});
    })
    .then(products => {
        let product;
        if(products.length>0){
             product = products[0];
        }
       
        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
           return product;
        }
        return Product.findByPk(prodId)
       
    })
    .then( product => {
        return fetchedCart.addProduct(product, {
            through: {quantity: newQuantity}
        });
    })
    .then(() => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
    // Product.findById(prodId, product => {
    //     Cart.addProduct(prodId,product.title,product.price);

    // });
    // Cart.fetchAll(prod => {
    //     res.render('cart',{prod});
    // });
    // console.log("post cart:",prodId);
    // res.redirect('/cart');
}
exports.getCart = (req,res,next) => {
    console.log(req.user.cart);
   req.user
   .getCart().then(cart => {
    // console.log(cart);
    return cart.getProducts()
    .then(products => {
        res.render('cart',{prod:products});
    })
    .catch(err => console.log(err));
   }).catch(err => console.log(err));
    // Cart.fetchAll(prod => {
        // res.render('cart',{prod});
    //  });
}
exports.postCartDeleteProduct = (req,res,next) => {
  const prodId = req.params.productId;
  console.log("postCartDeleteProduct:",prodId);
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({where: { id:prodId}});
  })
  .then(products => {
     const product = products[0];
     product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
}