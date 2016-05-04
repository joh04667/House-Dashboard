var router = require('express').Router();
var path = require('path');
var passport = require('passport');


router.get('/auth', function(req, res, next) {
  passport.authenticate('local', function(err, user, info))
  res.send(req.isAuthenticated());
});

module.exports = router;
