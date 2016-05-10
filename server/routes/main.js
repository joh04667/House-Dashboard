var router = require('express').Router();
var path = require('path');





router.get('/', function(request, response) {
  if(request.isAuthenticated()) {
    response.sendFile(path.join(__dirname, '../public/views/main.html'));
  } else {
    response.redirect('/');
  }
});




module.exports = router;
