/**
 * Generic login, with one user to test
 */

module.exports = function(sequelize, DataTypes) {

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
  return User;
};


/**
 * Creating a User table in the db
 */

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     username : DataTypes.STRING
//   }, {
//     classMethods : {
//       associate : function(models) {
//         User.hasMany(models.Photos);
//       }
//     }
//   });

//   return User;
// };