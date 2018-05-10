// let book = require("./books.js");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({ extended: true }));

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({ extname: ".html" }));
app.set("view engine", ".html");

app.get('/', (req, res) => {
    res.type('text/html');
    // res.sendFile(__dirname + 'public/home.html');
    res.render('home.html', { books: book.getAll });
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Page');
});

app.get('/details', (req, res) => {
    console.log(req.query)
    let found = book.get(Number(req.query.id));
    res.render("details", { id: (Number(req.query.id)), result: found, books: book.getAll })
});

app.get('/delete', (req, res) => {
    let found = book.delete(Number(req.query.id));
    let result = book.delete(Number(req.query.id));
    res.render("delete", { id: (Number(req.query.id)), result: found, books: book.getAll })
});


app.post('/details', (req, res) => {
    console.log(req.body)
    let found = book.get(Number(req.body.id));
    res.render("details", { id: (Number(req.body.id)), result: found, books: book.getAll })
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});