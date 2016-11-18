var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'DoryChat server API home page' });
});

module.exports = router;