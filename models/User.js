module.exports = function(sequelize, DataTypes) {

  var User = {
    findOne : function(opts, cb) {
      var user = {
        id : 1,
        username : opts.username,
        password : "my secret password",
        validPassword : function(password) {
          return (password === "my secret password");
        }
      };
      cb(null, user);
    }
  };
  return User;
};