var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;
var getMacs = require('../../modules/getMacs');

router.get('/', function(req, res) {
  console.log(req.ip);
    pg.connect(connectionString, function(err, client) {

      var query = client.query('SELECT * FROM mac;');
      var results = [];
      query.on('row', function(rowData) {
        results.push(rowData);
      });
      query.on('end', function() {
        res.send(results);
      });
  });
 
});



router.post('/', function(req, res) {

    pg.connect(connectionString, function(err, client) {
      console.log('saving', req.body);
      var query = client.query('INSERT INTO mac (name, mac) VALUES ($1, $2)', [req.body.name, req.body.mac]);
      console.log('saved');
      query.on('end', function() {
        res.sendStatus(200);
      });
  });
});

router.delete('/:id', function(req, res){

    pg.connect(connectionString, function(err, client) {

      var query = client.query('DELETE FROM mac WHERE id = $1;', [req.params.id]);

      query.on('end', function() {
        res.sendStatus(200);
      });
   });
});

router.get('/all', function(req, res) {
    getMacs(function(result) {
      if(result === 'err') {

        res.sendStatus(210);
        console.log('sent err');
      } else {
      var match = [];

       pg.connect(connectionString, function(err, client) {

        var query = client.query("SELECT name FROM mac WHERE mac = ANY($1);", [result]);

        query.on('row', function(rowData) {
          match.push(rowData);
          console.log('match is', match);
        });

        // query.on('err', function(err) {
        //   console.log(err);
        //   res.send(err);
        // });


        query.on('end', function(){
          client.end();
          res.send(match);

        });
      });
     }
    });
});

module.exports = router;
