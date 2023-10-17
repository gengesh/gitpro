// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user'); 
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');


const contactRoutes = require('./routes/contact');
const successRoutes = require('./routes/success');
const errorController = require('./controller/err');
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'shop'));

app.use((req,res,next) => {
User.findByPk(1).then(user => {
    req.user = user;
    next();
})
.catch(err => console.log(err));
});
app.use('/admin',adminRoutes);
app.use(shopRoutes); 
app.use('/admin',contactRoutes);
app.use('/admin',successRoutes);
app.use(errorController.getError);
Product.belongsTo(User,{constraints:true,onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem });
Product.belongsToMany(Cart,{through: CartItem });

// const server = http.createServer(app);
sequelize
// .sync({force:true})
.sync()
.then((results) => {
    return User.findByPk(1);
    // console.log(results);
    // app.listen(4000);
})
.then(user => {
    if(!user) {
        return User.create({name:'max',email:'test@test.com'});
    }
    return user;
})
.then(user => {
    // console.log(user);
    return user.createCart();
    // app.listen(4000);
})
.then(cart => {
    app.listen(4000);
})
.catch(err => console.log(err));
    