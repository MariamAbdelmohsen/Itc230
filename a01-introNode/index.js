var http = require('http');


http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('My first js!');
}).listen(process.env.PORT || 3000);