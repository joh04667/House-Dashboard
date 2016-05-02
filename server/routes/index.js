var router = require('express').Router();
var path = require('path');
var passport = require('passport'); 





router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});


router.post('/',
  passport.authenticate('local', {
    successRedirect: '/main', // these should point to pages
    failureRedirect: '/'
  })
);

module.exports = router;
