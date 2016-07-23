var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var publicAPI = {
  encryptPassword: function(password){
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    console.log('Produced a salt of:', salt);
    var encryptedPassword = bcrypt.hashSync(password, salt);
    console.log('created password:', encryptedPassword);
    return encryptedPassword;
  },
  comparePassword: function(candidatePassword, storedPassword) {
    return bcrypt.compareSync(candidatePassword, storedPassword);
  }
};

module.exports = publicAPI;
