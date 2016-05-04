var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');




router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});


router.post('/',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail',
    failureFlash: true
  })
);

module.exports = router;
