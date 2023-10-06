const product = [];
const fs = require('fs');
const getFromFile = cb =>{
  fs.readFile('data/data.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
               cb([]);
            } else {
              try {
                const jsonData = JSON.parse(data);
                // console.log('JSON data from the file:', jsonData);
                cb(jsonData);
              } catch (parseError) {
                cb([]);
              }
            }
    });
}
module.exports = class Product {
    constructor(id,title,price,des){
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = des;
    }
    save(){
      getFromFile(products =>{
        if(this.id) {
          const existingProductIndex = products.findIndex(prod => prod.id ===this.id);
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;
          const updatedJsonString = JSON.stringify(updatedProducts);
          fs.writeFile('data/data.json',updatedJsonString,(err) => {
            if (err) {
              console.error('Error writing to file:', err);
            } else {
              console.log('JSON data has been written to the file.');
            }
    });    
        }else{
           this.id = Math.random().toString();
           products.push(this);
          const jsonString = JSON.stringify(products);
      fs.writeFile('data/data.json',jsonString,(err) => {
          if (err) {
            console.error('Error writing to file:', err);
          } else {
            console.log('JSON data has been written to the file.');
          }
  });}
       

      });
    }
       
        // let existingData=[];
        // fs.readFile('data.json','utf8',(err,oldData) => {
        //   if(err){
        //     existingData = [];
        //   }else{
        //     if(oldData)
        //    existingData=JSON.parse(oldData);
        static fetchAll(cb){
        getFromFile(cb);
    } 
    static findById(id,cb) {
      getFromFile(products => {
        const product = products.find(p => p.id === id);
        cb(product);
      });
    }  
    static remainingFindById(id,cb){
      getFromFile(products => {
        const product = products.filter(p => p.id != id);
        cb(product);
      });
    }
}