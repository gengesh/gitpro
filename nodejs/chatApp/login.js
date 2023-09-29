const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/login',(req,res,next) => {  
    res.send(`
    <form action="/login" onsubmit="localStorage.setItem('username', document.getElementById('user').value)" method="POST"><input id="user" type="text" name="user"><button type="submit">login</button>
    </form>`)
    });
router.post('/login',(req,res,next) => {
        console.log(req.body.user);
        res.redirect('/');
    })

module.exports = router;