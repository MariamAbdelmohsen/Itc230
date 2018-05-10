//remote db connection settings. For security, connectionString should be in a separate file not committed to git
var mongoose = require('mongoose');

var connectionString = "mongodb://mariam:123456@ds217350.mlab.com:17350/itc230";
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);


var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
    title: { type: String, required: true },
    id: Number,
    year: Number
});

module.exports = mongoose.model('Book', mySchema);