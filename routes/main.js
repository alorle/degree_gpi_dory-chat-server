var express = require('express');
var router = express.Router();

router.all('/', function(req, res) {
  res.send('DoryChat server is up!!');
});

module.exports = router;