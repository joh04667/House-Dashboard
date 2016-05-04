var router = require('express').Router();


router.get('/', function(req, res) {
  console.log(req.flash('info'));
  res.status(301).send('Unauthorized User');
  // res.status(269).send('Unauthorized User');
});


module.exports = router;
