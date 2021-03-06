var express = require('express');
var router = express.Router();
var db = require('./../models');
var Photo = db.photo;
var allPhotos = require('../allPhotos');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

/**
 * Make sure users are logged in for each page
 * if not, redirect them back to login
 */

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

/**
 * Home Page
 */

router.get('/', ensureAuthenticated, function (req, res) {
  var allPhotos = require('./../allPhotos')();
  res.render('home-listing', {
    'mainPhoto' : allPhotos.pop(),
    'photos' : allPhotos
  });
});

/**
 * Create New Gallery Photo
 * Post to the gallery, redirect user back to main page
 */

router.post('/', ensureAuthenticated, function (req, res) {
  Photo.create( {
      url : req.body.url,
      title : req.body.description,
      author : req.body.author,
      description : req.body.description
    })
  .then(function(newPhoto) {
    res.redirect('/gallery/' + newPhoto.id);
  });
});

/**
 * New Photo Form Route
 * View ONLY
 */

router.get('/new', ensureAuthenticated, function (req, res) {
  res.render('new-photo', {
    // submitButton : 'Submit Photo' // submit information into the database
  });
});

/**
 * Gallery Photo Id Route +
 *
 */


router.route('/:id', ensureAuthenticated)
  .get(function(req, res) {
    Photo.randomTest(Photo.count());
    Photo.count().then(function(count) {
      console.log(count, 'hii');
    });

    // Find all photos except for the id.
    Photo.findAll({
      where : {
        id : {
          $ne : req.params.id
        }
      }
    })
      .then(function (allPhotos) {
        // Assign current photo id to a variable
        var currentPhotoId = req.params.id;
        // pick out the main photo
        var currentPhoto = allPhotos.reduce(function(prev, current) {
          if ( current.id === currentPhotoId) {
            return current;
          }
          // if prev found it, keep going
          if ( prev !== null) {
            return prev;
          } else {
            return null;
          }
        }, null);
        // res.render('home-detail', {
        //   'mainPhoto' : currentPhoto,
        //   'photo' :
        // });
      });
  });

  // .delete(function(req, res) {
  //   res.send('be able to delete this gallery photo, identified by the :id param');
  // })
  // .put(function(req, res) {
  //   res.send('be able to edit this gallery photo, identified by the :id param');
  // });

/**
 * Edit Gallery Photo by id
 */

router.get('/:id/edit', ensureAuthenticated, function (req, res) {
  res.render('edit-photo', {
    editButtonText : 'Edit Photo'
  });
});

module.exports = router;