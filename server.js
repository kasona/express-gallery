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

/**
 * Adding Template Engine
 * Tell express which template engine we are using by npm module name
 */

app.set('view engine', 'jade');

/**
 * Keep user logged in
 */
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session(
{
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true
}
));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(obj, done) {
  done(null, JSON.parse(obj));
});

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username : username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message : 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message : 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app. post('/login',
  passport.authenticate('local', { successRedirect : '/',
                                    failureRedirect : '/login',
                                    failureFlash : true })
);

app.get('/login', function(req, res) {
  res.render('login', { user : req.user, messages : req.flash('error') });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/secret', ensureAuthenticated, function(req, res) {
    res.send('secret');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
app.get('/users', ensureAuthenticated, function(req, res) {
  User.findAll()
    .then(function (users) {
      res.json(users);
    });
});

app.post('/users', ensureAuthenticated, function (req, res) {
  User.create({ username : req.body.username })
    .then(function (user) {
      res.json(user);
    });
});

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
 * default Routes

 */

app.use('/gallery', require('./routes/gallery.js'));


/**
 * Authentication
 */


/**
 * Order Matters!!!!
 */

app.get('/', ensureAuthenticated, function(req, res) {
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
  db.sequelize.sync();

  console.log('Example app listening at http://%s:%s', host, port);
});


var User = {
  findOne : function(opts, cb) {
    var user = {
      id : 1,
      username : opts.username,
      password : "bagel",
      validPassword : function(password) {
        return (password === "bagel");
      }
    };
    cb(null, user);
  }
};