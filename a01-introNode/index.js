var http = require("http");
http.createServer(function(req, res) {
    var path = req.url.toLowerCase();
    switch (path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Home Page!');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('About Page!');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not found');
            break;
    }

}).listen(process.env.PORT || 3000);