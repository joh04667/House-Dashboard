var router = require('express').Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

router.get('/', function(req, res) {
  if(!req.isAuthenticated) {res.send('Authentication error. Please log in.');
} else {
    pg.connect(connectionString, function(err, client) {

      var result = [];

        var query = client.query("SELECT post.id, post.title, post.message, post.date, user_id, users.display_name FROM post JOIN users ON post.user_id = users.id;");

        query.on('row', function(row) {
          result.push(row);
        });

        query.on('end', function() {
          res.send(result);
          client.end();
        });
    });
  }
});

router.post('/', function(req, res) {
  if(!req.isAuthenticated) {res.send('Please login before posting');}
  else {
    pg.connect(connectionString, function(err, client) {
      var date = new Date();
      var query = client.query('INSERT INTO post (title, message, date, user_id) VALUES ($1, $2, $3, $4);', [req.body.title, req.body.text, date, req.session.passport.user]);


      query.on('end', function() {
        res.sendStatus(200);
        client.end();
    });
  });
 }
});

router.delete('/:id', function(req, res) {
  if(!req.isAuthenticated) {res.sendStatus(500);}
  else {
    pg.connect(connectionString, function(err, client) {
      var query = client.query('DELETE FROM post WHERE id = $1;', [req.params.id]);
      query.on('end', function() {
        res.sendStatus(222);
        client.end();
      });
    });
  }
});

module.exports=router;
