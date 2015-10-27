// module pattern
var express = require('express');

var app = express();

var jade = require('jade');

var router = require('./router/router');

var db = require('./models');
var User = db.User;

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

// ============ Routes ======================
app.use('/', router);


app.get('/users', function(req, res) {
  User.findAll()
  .then(function (users) {
    res.json(users);
  });
});

app.post('/users', function (req, res) {
  User.create({ username: req.body.username })
  .then(function (user) {
    res.json(user);
  });
});


// Creating a server listening on port 3000
// listen is express's way of creating a HTTP server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();

  console.log('Example app listening at http://%s:%s', host, port);
});