// module pattern
var express = require('express');
var app = express();
var jade = require('jade');
// var router = require('./routes/gallery.js');
var db = require('./models');
var User = db.User;
var Photo = db.photo;
var bodyParser = require('body-parser');

// for Authentication
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');

app.use(methodOverride(function(req, res) {
  if (req.body && type of req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/**
 * Adding Template Engine
 * Tell express which template engine we are using by npm module name
 */

app.set('view engine', 'jade');

app.use(session(
{
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}
));

/**
 * Tell Express where the templates are
 */

app.set('views', __dirname + '/views');

/**
 * Hi Express! Look in here and run these files!
 */

app.use(express.static('./public'));

/**
 * Parser
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


/**
 * Routes
 */

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

/**
 * Creating a server listening on port 3000
 * Listen is express's way of creating a HTTP server
 */

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});