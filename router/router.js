var express = require('express');
var router = express.Router();

// ================== Home Route ====================
router.get('/', function (req, res) {
  res.render('home-listing', {
    photos : allPhotos.photos
  });
});

// =============== New Photo Form Route =====================
// Just the view for the users to submit a photo
router.get('/gallery/new', function (req, res) {
  res.render('new-photo', {
    submitButton : 'Submit Photo'
  });
});

// =============== Create New Gallery Photo ==================
// Actually posts the photo to the gallery, link in the form
router.post('/gallery/new', function (req, res) {
  res.send('post new photo to /gallery' + req.body.home);
});

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