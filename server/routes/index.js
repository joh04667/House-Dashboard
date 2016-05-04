var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');
var session = require('express-session');
var app = express();

var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {maxAge: 60000, secure: false}
// }));


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

router.get('/auth', function(req, res, next) {
  console.log('requested session info for', req.session);
  var userId = req.session.passport.user;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {
      var user = {};
      var query = client.query('SELECT * FROM users WHERE id = $1;', [userId]);

      query.on('row', function(row) {
        user = row;
      });
      query.on('end', function() {
        client.end();
        console.log(user);
        res.send({username: user.username, display_name: user.display_name, id: user.id, permissions: user.permissions, isLogged: passport.authenticate()});
        done();
      });
    }
  });
});
module.exports = router;
