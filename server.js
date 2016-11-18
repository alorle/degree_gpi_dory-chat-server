var express = require('express');

var router_main = require('./routes/main');
var router_api = require('./routes/api');

var app = express();

// Define port where app will listen
var port = process.env.PORT || 8080;

// Define router usage
app.use('/', router_main);
app.use('/api', router_api);

// Make app listen
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
