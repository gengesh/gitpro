const path = require('path');
const express = require('express');

const router= express.Router();

router.get('/success',(req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views','success.html'));
});


module.exports = router;
