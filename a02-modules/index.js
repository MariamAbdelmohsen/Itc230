var http = require("http"),
    fs = require("fs"),
    qs = require("querystring")
let books = require("./books.js");

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

http.createServer((req, res) => {
    let url = req.url.split("?");
    let query = qs.parse(url[1]);
    let path = url[0].toLowerCase();

    switch (path) {
        case '/':
            serveStatic(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is the About Page!');
        case '/book':
            fs.readFile('booklist.html', function read(err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });
            break;
            // case '/All':
            //     let all = book.getAll();
            //     res.writeHead(200, { 'Content-Type': 'text/plain' });
            //     res.end('Result for book ID:' + books + "\n" + results);
            //     break;
        case '/get':
            let found = books.get(query.id);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            let results = (found) ? JSON.stringify(found) : "Not Found";
            res.end('Result for book ID:' + query.id + "\n" + results);
            break;
        case '/delete':
            let removed = books.delete(oldlenght);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            let newresults = (removed) ? JSON.stringify(removed) : "Removed";
            res.end('Book ID: ' + query.id + newresults);
            break;
        case '/add':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('new added');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Page -- Not found');
    }

}).listen(process.env.PORT || 3000);