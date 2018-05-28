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

app.get('/delete', (req, res) => {
    Book.remove({ id: (Number(req.query.id)) }, (err, result) => {
        if (err) return next(err);
        let deleted = result;
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', { id: (Number(req.query.id)), deleted: result, total: total })
        });
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

app.get('/api/book/add/:id', (req, res, next) => {
    let id = (Number(req.params.id));
    Book.update({ id: (Number(req.params.id)) }, { upsert: true }, (err, result) => {
        // Book.update({ id: (Number(req.params.id)), title: title, author: author }, { upsert: true }, (err, book) => {
        if (err) return next(err);
        res.json({ updated: result.nModified });
    });
});

app.get('/api/book/delete/:id', (req, res, next) => {
    Book.remove({ id: (Number(req.params.id)) }, (err, book) => {
        if (err) return next(err);
        let deleted = result;
        Book.count((err, total) => {
            res.json('deleted', { id: (Number(req.query.id)), deleted: result.result.n, total: total })
        });
    });
});


// app.post('/add', (req, res) => {
//     Book.add({ id: (Number(req.query.id)) }, (err, result) => {
//         if (err) return next(err);
//         let added = result;
//         Book.push((err, total) => {
//             res.type('text/html');
//             res.render('add', { id: (Number(req.query.id)), title: title, year: year, added: result, total: total })
//         });

//     });
// });

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