// let book = require("./books.js");
// let Book = require("./models/book.js");
let Book = require("./models/db.js");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + './public'));
app.use(require("body-parser").urlencoded({ extended: true }));

let handlebars = require("express-handlebars");
app.engine(".html", handlebars({ extname: ".html" }));
app.set("view engine", ".html");

app.get('/', (req, res) => {
    Book.find((err, books) => {
        res.type('text/html');
        if (err) return next(err);
        // console.log(books.length);
        res.render('home.html', { books: books });
    });
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Page');
});


app.get('/details', (req, res) => {
    Book.findOne({ id: (Number(req.query.id)) },
        (err, book) => {
            if (err) return next(err);
            res.type('text/html');
            // console.log(req.query)
            res.render("details", { result: book });
        })
});

app.post('/details', (req, res, next) => {
    Book.findOne({ id: (Number(req.body.id)) },
        (err, book) => {
            if (err) return next(err);
            res.type('text/html');
            // console.log(req.body)
            res.render("details", { result: book });
        })
});

app.get('/delete', (req, res, next) => {
    Book.remove({ id: (Number(req.query.id)) }, (err, result) => {
        if (err) return next(err);
        let deleted = result;
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', { id: (Number(req.query.id)), deleted: result, total: total })
        });
    });
});
// app.get('/add', (req, res, next) => {
//     let title = req.params.title;
//     Book.update({ title: title }, req.params, { upsert: true }, (err, result) => {
//         if (err) return next(err);
//         let added = result;
//         res.type('text/html');
//         res.render('add', { updated: result })

//     });
// });

app.post('/add', (req, res, next) => {
    let id = req.params.id;
    let title = req.params.title;
    let year = req.params.year;
    let author = req.params.author;
    Book.update({ id: req.params.id }, req.params, { upsert: true }, (err, result) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('add', { updated: result, id: req.params.id, title: title, year: req.params.year, author: author });
    });
});
// "id": 1,
// "title": "Harry Potter and the Sorceret' s Stone",
// "year": 1997,
// "author": "J. K. Rowling"


app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});