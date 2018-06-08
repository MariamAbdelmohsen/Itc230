'use strict'

let Book = require("./api/models/db.js");
let bodyParser = require("body-parser");
let url = "https://itc-130-maryouma11.c9users.io/";
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err);
});
let handlebars = require("express-handlebars");

let fetch = require("node-fetch");

app.engine(".html", handlebars({ extname: ".html" }));
app.set("view engine", ".html");


app.get('/', (req,res, next) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: JSON.stringify(books)});    
    });
});

app.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

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

app.post('/api/book/add/', (req,res, next) => {
    if (!req.body.id) {
        let book = new Book({id: req.body.id,title: req.body.title,year: req.body.year,author: req.body.author});
        book.save((err,newBook) => {
              if (err) return next(err);
            console.log(newBook)
            res.json({updated: 0, _id: newBook._id});
        });
    } else { 
        Book.updateOne({ id: req.body.id}, { id: req.body.id,title: req.body.title, year: req.body.year, author: req.body.author }, (err, result) => {
           if (err) return next(err);
            res.json({updated: result.nModified, id: req.body.id});
        });
        
    }
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
            res.json({ id: req.params.id, deleted: result, total: total });
        });
    });
});

// "id": 1,
// "title": "Harry Potter and the Sorceret' s Stone",
// "year": 1997,
// "author": "J. K. Rowling"


app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});