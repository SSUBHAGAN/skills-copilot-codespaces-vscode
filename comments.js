// Create web server
// Run: node comments.js
// Access: http://localhost:3000/

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var fs = require("fs");

// Set view engine
app.set('view engine', 'ejs');

// Use static files
app.use(express.static('public'));

// Render home page
app.get('/', function (req, res) {
   res.render('index');
})

// Render comments page
app.get('/comments', function (req, res) {
   res.render('comments');
})

// Handle post request
app.post('/comments', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.body.name,
      comment:req.body.comment
   };
   console.log(response);
   res.end(JSON.stringify(response));

   // Write to file
   fs.appendFile('comments.txt', JSON.stringify(response) + "\n", function (err) {
      if (err) {
          return console.error(err);
      }
   });
})

// Start server
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Server running at http://%s:%s", host, port)
})