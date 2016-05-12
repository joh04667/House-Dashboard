var router = require('express').Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.get('/', function(req, res) {
  if(!req.isAuthenticated) {res.sendStatus(401);}
  else {

      pg.connect(connectionString, function(err, client) {

          var result = [];

          var query = client.query("SELECT id, task, date_added, date_completed, users.display_name FROM chores JOIN users ON user_id = users.id ;");

          query.on('row', function(data) {
            result.push(data);
          });

          query.on('end', function() {
            res.send(result);
            cliend.end();
          });
    });
  }
});

router.post('/', function(req, res) {
  if(!req.isAuthenticated) {res.sendStatus(401);}
  else {

      pg.connect(connectionString, function(err, client) {

          var dateAdded = new Date();

          var query = client.query("INSERT INTO chores (task, date_added, date_completed, user_id) VALUES ($1, $2, null, $3);", [req.body.task, dateAdded, req.session.passport.user]);

          query.on('end', function() {
            res.sendStatus(200);
            cliend.end();
          });
      });
   }
});




router.exports = router;
