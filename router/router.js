var express = require('express');
var router = express.Router();
var db = require('./../models');
var Photo = db.photo;
console.log("BANANANANANANANNAA", Photo);


// ================== Home Route ====================
router.get('/', function (req, res) {
  var allPhotos = require('./../allPhotos')();
  res.render('home-listing', {
    'mainPhoto' : allPhotos.pop(),
    'photos' : allPhotos
  });
});

// =============== New Photo Form Route =====================
// Just the view for the users to submit a photo
router.get('/gallery/new', function (req, res) {
  res.render('new-photo', {
    // submitButton : 'Submit Photo' // submit information into the database
  });
});

// =============== Create New Gallery Photo ==================
// THIS DOESNT WORK, ONLY CAN POST ON SERVER.JS WHYYYYY
// Actually posts the photo to the gallery, link in the form
// router.post('/', function (req, res) {
//   res.render('home-listing', function (req, res) {
//     // Get information from the user ( postman )
//     // Create a photo with these values!
//     Photo.create( {
//       url : req.body.url,
//       title : req.body.description,
//       author : req.body.author,
//       description : req.body.description
//     });
//   });
// });

// =============== Edit Gallery Photo by id =================
router.get('/gallery/:id/edit', function (req, res) {
  res.render('edit-photo', {
    editButtonText : 'Edit Photo'
  });
});

// ================ Gallery Photo id Route + ==================
// If you have multiple HTTP methods for one route
router.route('/gallery/:id')
  .get(function(req, res) {
    var allPhotos = require('./../allPhotos')();
    res.render('home-detail', {
      'mainPhoto' : allPhotos.pop(),
      'photos' : allPhotos
    });
  })
  .delete(function(req, res) {
    res.send('be able to delete this gallery photo, identified by the :id param');
  })
  .put(function(req, res) {
    res.send('be able to edit this gallery photo, identified by the :id param');
  });

module.exports = router;