var http = require("http"),
    fs = require("fs");


function serveStatic(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    console.log(__dirname + path)
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    var path = req.url.toLowerCase();
    switch (path) {
        case '/':
            // app.get('/../a01-introNode/public/home.html', function(req, res) {
            //     res.send('/../a01-introNode/public/home.html')
            // });
            serveStatic(res, '/../../public/home.html', 'text/html');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is the About Page!');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Page -- Not found');
    }

}).listen(process.env.PORT || 3000);