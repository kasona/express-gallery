/**
 * Creating a photo db table
 */

module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define( "photo", {
    url : DataTypes.STRING,
    title : DataTypes.TEXT,
    author : DataTypes.TEXT,
    description : DataTypes.TEXT
  }, {
    // Disable modification of tablenames. makes table into photo not photos
    freezeTableName : true
  });

  // Hard code some images on the page
  Photo.sync({ force : true }).then(function() {
    Photo.create({
      url : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'this is title',
      author : 'banana',
      descritption : 'this is the descritption'
    });
    Photo.create({
      url : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'this is title',
      author : 'banana',
      descritption : 'this is the descritption'
    });
    Photo.create({
      url : 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
      title : 'this is title',
      author : 'banana',
      descritption : 'this is the descritption'
    });
  });

  return Photo;
};
