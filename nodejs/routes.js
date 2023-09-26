const fs = require('fs');
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        fs.readFile("message.txt",{encoding: "utf-8"},function(err,data){
           if(err){
               console.log(err);
           }
           console.log("content from the file:"+data);
           res.write('<html>');
           res.write('<head><title>Enter Message</title></head>');
           res.write(`<body>${data}<form action="/message" method="POST"><input type="text"name="message"><button type="submit">Send</button></form></body>`);
           res.write('</html>');
           return res.end();
        });
    }
    else if(url === '/message' && method === 'POST') {
    const body = [];
    req.on('data',(chunk) => {
       console.log(chunk);
    body.push(chunk);
    });
    req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split("=")[1];
    fs.writeFile('message.txt',message,(err)=>{
       if(err){
           console.log(err);
       }
       
       res.statusCode = 302;
       res.setHeader('Location','/');
      return res.end();
    });
    });
    
    
    }
    else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
           res.write('<head><title>My first page:</title></head>');
           res.write('<body><h1>Hello from my Node.js Server</h1></body>');
           res.write('</html>');
           res.end();  
           
    }
}
// module.exports = requestHandler;
// module.exports = {
//     handler:requestHandler,
//     someText:"this is in exports modules text"
// }
exports.handler = requestHandler;
exports.someText = "this next export type";