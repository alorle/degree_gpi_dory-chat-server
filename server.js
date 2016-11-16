var express = require('express');
var app = express();

// Define port where app will listen
var port = process.env.PORT || 8080;

// Default route
app.get('/', function (req, res) {
  res.send('DoryChat server is up!!');
});

// Make app listen
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
