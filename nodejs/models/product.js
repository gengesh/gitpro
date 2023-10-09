// const product = [];
// const db = require('../util/database');
// module.exports = class Product {
//     constructor(id,title,price,des){
//         this.id = id;
//         this.title = title;
//         this.price = price;
//         this.description = des;
//     }
//     save(){
//       return db.execute('INSERT INTO products (title,price,description) VALUES (?,?,?)',[this.title,this.price,this.description]);     
//     }
//         static fetchAll(){
//         return db.execute('SELECT * FROM products');
//     } 
//     static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
//     }  
//     static remainingFindById(id){
//      return db.execute('DELETE FROM products WHERE products.id = ?',[id]);
//     }
// };
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Product = sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true, 
    allowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price: {
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  description: {
    type:Sequelize.STRING,
    allowNull:false
  }
});
module.exports = Product;