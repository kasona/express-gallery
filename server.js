// module pattern
var express = require('express');

// putting express to an app by invoking it
var app = express();

// ============== Adding Template Engine ============
// Tell Express which Template engine we are using by NPM module name
app.set('view engine', 'jade');

// Telling Express where views are, being relative to where you are
app.set('views', './views');

// ======== Hi Express, look in here & process these files =======
app.use(express.static('./public'));

// ================== Home Route ====================
app.get('/', function (req, res) {
  res.send('List of gallery photos');
});

// ================ Gallery Photo id Route + ==================
// If you have multiple HTTP methods for one route
// app.route('/gallery/:id')
//   .get(function(req, res) {
//     // console.log(req,reees);
//     res.send('get single gallery photo');
//   })
//   .delete(function(req, res) {
//     res.send('be able to delete this gallery photo, identified by the :id param');
//   })
//   .put(function(req, res) {
//     res.send('be able to edit this gallery photo, identified by the :id param');
//   });

// =============== New Photo Form Route =====================
// Just the view for the users to submit a photo
app.get('/gallery/new', function (req, res) {
  //res.render('filename')
  res.render('index', {
    submitButtonText : 'Submit Photo'
  }); // to see a 'new photo' form
});

// =============== Create New Gallery Photo ==================
// Actually posts the photo to the gallery, link in the form
app.post('/gallery', function (req, res) {
  res.send('create a new galery photo');
});

// =============== Edit Gallery Photo by id =================
app.get('/gallery/:id/edit', function (req, res) {
  res.send('index', {
    editButtonText : 'Edit Photo'
  });
});

// Creating a server listening on port 3000 ( 3000 is standard for testing )
// listen is express's way of creating a HTTP server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  // go to localhost:3000
  console.log('Example app listening at http://%s:%s', host, port);
});