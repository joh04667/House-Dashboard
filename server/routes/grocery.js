var router = require('express').Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

router.get('/', function(req, res) {

      pg.connect(connectionString, function(err, client) {

          var result = [];

          var query = client.query("SELECT * FROM groceries;");

          query.on('row', function(data) {
            result.push(data);
          });

          query.on('end', function() {
            res.send(result);
            client.end();
          });
    });
});


router.post('/', function(req, res) {

    pg.connect(connectionString, function(err, client) {
      var now = new Date();
      var result = [];

      var query = client.query('INSERT INTO groceries (item, date_added, name) VALUES ($1, $2, $3)' + 'RETURNING id, item, date_added, name;', [req.body.item, now, req.body.name]);

      query.on('row', function(row) {
        result.push(row);
      });

      query.on('end', function() {
        res.send(result);
        client.end();
      });
    });
});

router.put('/', function(req, res) {

    pg.connect(connectionString, function(err, client) {
      console.log('puting grocery');
      var now = new Date();
      var result = [];

      var query = client.query('UPDATE groceries SET date_completed = ($1), completed_by=($2) WHERE id=($3);', [now, req.body.name, req.body.id]);


      query.on('end', function() {
        res.sendStatus(201);
        client.end();
      });
    });
});


module.exports = router;
