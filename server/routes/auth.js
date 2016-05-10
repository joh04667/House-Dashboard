var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.get('/', function(req, res, next) {
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
        // client.end();
        console.log(user);
        res.send({username: user.username, display_name: user.display_name, id: user.id, permissions: user.permissions, isLogged: passport.authenticate()});
        done();
      });
    }
  });
});

module.exports = router;
