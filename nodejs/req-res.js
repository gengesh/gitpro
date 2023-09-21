const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const url = req.url;
    if(url === '/home')
    res.end('Welcome home');
else if(url === '/about')
res.end('welcome to about us page')
else if(url === '/node')
res.end('welcme to node js project');
});
server.listen(4000);
