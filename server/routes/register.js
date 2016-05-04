var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;
var encryptLib = require('../../modules/encryption');


router.get('/', function(req, res, next){
   res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// post new user
router.post('/', function(req, res, next) {
  console.log(req.body);
  pg.connect(connectionString, function(err, client) {

    // put this into db
    var user = {
      username: req.body.username,
      password: encryptLib.encryptPassword(req.body.password),
      display_name: req.body.display_name,
    };

    console.log('Creating user', user);

    var query = client.query('SELECT username FROM users WHERE username= $1;', [user.username]);
    var results = [];
    query.on('row', function(rowData) {
      results.push(rowData);
    });
    query.on('end', function() {
      console.log('checked for username, results', results);
      if(results !== []) {
        res.sendStatus(418);
      }
    });

    if(results === []) {
    var query = client.query('INSERT INTO users (username, password, display_name, active, permissions) VALUES ($1, $2, $3, true, $4)', [user.username, user.password, user.display_name, "user"]);

    query.on('error', function(err) {console.log(err);});

    query.on('end', function() {
      res.sendStatus(200);
      client.end();
    });
   }
  });
});

module.exports = router;
