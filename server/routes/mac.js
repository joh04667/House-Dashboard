var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.post('/', function(req, res) {
  if(!req.isAuthenticated()) {res.send('ERROR no auth');}
  else {
    pg.connect(connectionString, function(err, client) {

      var query = client.query('INSERT INTO mac (name, mac) VALUES ($1, $2)', [req.body.name, req.body.mac]);
      var results = [];
      query.on('row', function(rowData) {
        results.push(rowData);
      });
      query.on('end', function() {
        res.sendStatus(200);
      });
  });
 }
});

module.exports = router;
