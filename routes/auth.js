var express = require('express');
var db = require('../database/main');
var router = express.Router();

router.post('/', function (req, res) {
  if (!req.body) {
    var err = new Error();
    err.message = 'No body given in POST request';
    return handleError(res, err);
  }

  db.authUser(req.body.email, req.body.password)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'User authenticated'
        });
    })
    .catch(function (err) {
      res.status(500).json({
        status: 'failed',
        message: 'User not authenticated'
      });
    });
});

module.exports = router;