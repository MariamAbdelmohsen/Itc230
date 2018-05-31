// let book = require("./books.js");
let Book = require("./models/db.js");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + './public'));
app.use(require("body-parser").urlencoded({ extended: true }));
var router = express.Router();

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

app.post('/details', (req, res) => {
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
app.get('/add', (req, res, next) => {
    // let id = (Number(req.params.id));
    let title = req.params.title;
    Book.update({ title: title }, { upsert: true }, (err, result) => {
        // Book.update({ title: title }, { upsert: true }, (err, result) => {
        if (err) return next(err);
        let added = result;
        res.type('text/html');
        res.render('add', { updated: result })

    });
});

// app.get('/foo', (req, res, next) => {
//     if (Math.random() < 0.5) return next();
//     res.send('something this');
// });
// app.send('/foo', (req, res) => {
//     res.send('and something that');
// });


app.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
// app.get('/api/books', (req, res) => {
//     var books = books.getAll();
//     if (books) {
//         res.json(books);
//     } else {
//         return res.status(500).send('Error : Database error.');
//     }
// });
app.get('/api/book', (req, res, next) => {
    Book.find({}, (err, book) => {
        if (err) return next(err)
        res.json(book);
    });
});

app.get('/api/book/:id', (req, res, next) => {
    let id = (Number(req.params.id));
    Book.findOne({ id: (Number(req.params.id)) }, (err, book) => {
        if (err) return next(err);
        res.json(book);
    });
});

app.get('/api/book/add/:id/:title/:year/:author', (req, res, next) => {
    let id = req.params.id;
    let title = req.params.title;
    let year = req.params.year;
    let author = req.params.author;
    Book.update({ id: req.params.id }, req.params, { upsert: true }, (err, result) => {
        if (err) return next(err);
        res.json({ updated: result, id: req.params.id, title: title, year: req.params.year, author: author });
    });
});

app.get('/api/book/delete/:id', (req, res, next) => {
    Book.remove({ id: req.params.id }, (err, result) => {
        if (err) return next(err);
        Book.count((err, total) => {
            res.json({ id: req.params.id, deleted: result, total: total })
        });
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