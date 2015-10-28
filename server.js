// module pattern
var express = require('express');
var app = express();
var jade = require('jade');
// var router = require('./routes/gallery.js');
var db = require('./models');
var User = db.User;
var Photo = db.photo;
var bodyParser = require('body-parser');

// ============== Adding Template Engine ============
// Tell Express which Template engine we are using by NPM module name
app.set('view engine', 'jade');

// Telling Express where views are, being relative to where you are
// app.set('views', './views');
app.set('views', __dirname + '/views');

// ======== Hi Express, look in here & process these files =======
app.use(express.static('./public'));

// ============ Parser ==================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// ============ Routes ================
app.use('/gallery', require('./routes/gallery.js'));

app.get('/', function(req, res) {
  Photo.findAll()
  .then(function (photos) {
    res.render('home-listing', {
      title : 'Express Gallery',
      mainPhoto : photos.pop(),
      photos : photos
    });
  });
});

// Creating a server listening on port 3000
// listen is express's way of creating a HTTP server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  // db.sequelize.sync();

  console.log('Example app listening at http://%s:%s', host, port);
});