const path = require('path');
exports.getShop = (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
};