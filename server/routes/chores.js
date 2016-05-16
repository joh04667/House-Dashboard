var router = require('express').Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.get('/', function(req, res) {
  if(!req.isAuthenticated()) {res.sendStatus(401);}
  else {

      pg.connect(connectionString, function(err, client) {

          var result = [];

          var query = client.query("SELECT chores.id, task, date_added, date_completed, completed_by, assigned_to, users.display_name FROM chores JOIN users ON user_id = users.id ;");

          query.on('row', function(data) {
            result.push(data);
          });

          query.on('end', function() {
            res.send(result);
            client.end();
          });
    });
  }
});

router.post('/', function(req, res) {
  if(!req.isAuthenticated()) {res.sendStatus(401);}
  else {
    console.log('got chore', req.body);
      pg.connect(connectionString, function(err, client) {

          var dateAdded = new Date();

          var query = client.query("INSERT INTO chores (task, date_added, date_completed, user_id, assigned_to) VALUES ($1, $2, null, $3, $4);", [req.body.task, dateAdded, req.session.passport.user, req.body.assigned_to]);

          query.on('end', function() {
            res.sendStatus(200);
            client.end();
          });
      });
   }
});

router.put('/', function(req, res) {
  pg.connect(connectionString, function(err, client) {

    var dateCompleted = new Date();

    var query = client.query("UPDATE chores SET date_completed=$1, completed_by=$2 WHERE id=$3;", [dateCompleted, req.body.completed_by, req.body.id]);

    query.on('end', function() {
      res.sendStatus(200);
      client.end();
    });

  });
});


module.exports = router;
