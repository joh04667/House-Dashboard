var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');
var session = require('express-session');
var app = express();

var pg = require('pg');
var connectionString = require('../db/connection').connectionString;



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



router.get('/logout', function(req, res){
  req.logout();
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});



module.exports = router;
