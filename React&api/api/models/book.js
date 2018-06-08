var Book = require("./db");

// return all records
Book.find({}, function(err, items) {
    if (err) return next(err);
    console.log(items.length);
    // return items.length
    // other code here
});
// return all records that match a condition
Book.find({ 'author': 'J. K. Rowling' }, function(err, items) {
    if (err) return next(err);
    console.log(items);
    // other code here
});

// return a single record
Book.findOne({ 'title': 'The Handmaid\'s Tale' }, function(err, item) {
    if (err) return next(err);
    console.log(item);
    // other code here
});