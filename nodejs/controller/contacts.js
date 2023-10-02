const path = require('path');
exports.getContact = (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views','contact.html'));
}