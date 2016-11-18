var express = require('express');
var db = require('../database/main');
var router = express.Router();

// Generic error handler used by all API endpoints.
function handleError(res, err) {
  console.error("ERROR: " + err);
  res.status(500).json({
    status: 'error',
    "message": err.message
  });
}

// API home page
router.get('/', function (req, res) {
  res.json({
    message: 'DoryChat server API home page'
  });
});

// GET all users
router.get("/users", function (req, res) {
  db.getUsers()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      handleError(res, err);
    });
});

// CREATE a new user
router.post("/users", function (req, res) {
  if (!req.body) {
    var err = new Error();
    err.message = 'No body given in POST request';
    return handleError(res, err);
  }

  db.createUser(req.body.name, req.body.email, req.body.password)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created ONE user'
        });
    })
    .catch(function (err) {
      handleError(res, err);
    });
});

// GET a user with given email
router.get("/users/:email", function (req, res) {
  db.getUser(req.params.email)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      handleError(res, err);
    });
});

// DELETE a user with given email
router.delete("/users/:email", function (req, res) {
  db.deleteUser(req.params.email)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Deleted ONE user'
        });
    })
    .catch(function (err) {
      handleError(res, err);
    });
});

module.exports = router;