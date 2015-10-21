// module pattern
var express = require('express');

var app = express();

var jade = require('jade');

var router = require('./router/router');

// var mongo = require('mongodb');

// ============== Adding Template Engine ============
// Tell Express which Template engine we are using by NPM module name
app.set('view engine', 'jade');

// Telling Express where views are, being relative to where you are
// app.set('views', './views');
app.set('views', __dirname + '/views');

// ======== Hi Express, look in here & process these files =======
app.use(express.static('./public'));

// =========== Routes ======================
app.use('/', router);

// Creating a server listening on port 3000
// listen is express's way of creating a HTTP server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});