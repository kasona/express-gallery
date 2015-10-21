var express = require('express');
var router = express.Router();

// ================== Home Route ====================
router.get('/', function (req, res) {
  res.render('./home-listing', {
    photos : [{
      image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'blah blah - ',
      link : 'https://www.pexels.com/',
      id : 1
    }, {
      image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'blah blah - ',
      link : 'https://www.pexels.com/',
      id : 2
    }, {
      image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'blah blah - ',
      link : 'https://www.pexels.com/',
      id : 3
    }],
    mainPhoto : [{
      image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      id : 0
    }]
  });
});

// =============== New Photo Form Route =====================
// Just the view for the users to submit a photo
router.get('/gallery/new', function (req, res) {
  res.render('./layouts/new-photo', {
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
  res.render('./layouts/edit-photo', {
    editButtonText : 'Edit Photo'
  });
});

// ================ Gallery Photo id Route + ==================
// If you have multiple HTTP methods for one route
router.route('/gallery/:id')
  .get(function(req, res) {
    res.render('./layouts/home-detail', {
      mainPhoto : [{
        image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
        title : 'blah blah - ',
        link : 'https:www.pexels.com/',
        description : 'Candy canes candy canes apple pie sweet roll powder. Bear claw brownie tootsie roll dragée. Sweet roll croissant brownie candy canes liquorice. Sweet roll oat cake caramels cookie cotton candy. Danish brownie toffee.',
        copyright : 'Copyright www.pexels.com/'
      }],
      photos : [{
        image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
        title : 'blah blah - ',
        link : 'https://www.pexels.com/'
      }, {
        image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
        title : 'blah blah - ',
        link : 'https://www.pexels.com/'
      }, {
        image : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
        title : 'blah blah - ',
        link : 'https://www.pexels.com/'
      }]
    });
  })
  .delete(function(req, res) {
    res.send('be able to delete this gallery photo, identified by the :id param');
  })
  .put(function(req, res) {
    res.send('be able to edit this gallery photo, identified by the :id param');
  });

module.exports = router;