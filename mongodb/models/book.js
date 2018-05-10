var Book = require("./db");


// return all records
Book.find({}, function(err, items) {
    if (err) return next(err);
    console.log(items.length);
    // other code here
});