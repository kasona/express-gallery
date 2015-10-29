var express = require('express');
var router = express.Router();
var db = require('./../models');
var Photo = db.photo;
var allPhotos = require('../allPhotos');
/**
 * Home Page
 */

router.get('/', function (req, res) {
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

router.post('/', function (req, res) {
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

router.get('/new', function (req, res) {
  res.render('new-photo', {
    // submitButton : 'Submit Photo' // submit information into the database
  });
});

/**
 * Gallery Photo Id Route +
 *
 */

router.route('/:id')
  .get(function(req, res) {
    Photo.findOne({
      where : {
        id : req.params.id
      }
    })
    .then(function(single) {
      console.log(single);
      res.render('home-detail', {
        'mainPhoto' : {
          image : single.url,
          title : single.title

        },
        'photos' : allPhotos()
      });
    });
  })
  .delete(function(req, res) {
    res.send('be able to delete this gallery photo, identified by the :id param');
  })
  .put(function(req, res) {
    res.send('be able to edit this gallery photo, identified by the :id param');
  });

/**
 * Edit Gallery Photo by id
 */

router.get('/:id/edit', function (req, res) {
  res.render('edit-photo', {
    editButtonText : 'Edit Photo'
  });
});

module.exports = router;