var router = require('express').Router();


router.get('/', function(req, res) {
  console.log('not authorized');
  res.sendStatus(250);
});


module.exports = router;
