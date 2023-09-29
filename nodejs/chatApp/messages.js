const express = require('express');
const router = express.Router();
const fs = require('fs');
router.get('/',(req,res,next) => {
    const readData = fs.readFileSync("./chatMessage.txt")
    res.send(`<html><body>${readData}<form action="/" onsubmit="document.getElementById('user').value=localStorage.getItem('username')" method="POST"><input id="message" type="text" name="message"><input id="user" type="hidden" name="user"><button type="submit">send</button>
</form></body></html>`)
});
router.post('/',(req,res,next) => {
    console.log(req.body);
    const data = req.body.message;
    const user1 = req.body.user;
    const details = `${user1} : ${data}`;
    console.log(details);
    fs.writeFile('chatMessage.txt',details,{flag:'a'},(err)=>{
        console.log(err);
    });
    res.redirect('/');
})
module.exports = router;