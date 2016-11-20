var bodyParser = require("body-parser");
var express = require('express');

var router_main = require('./routes/main');
var router_api = require('./routes/api');
var router_auth = require('./routes/auth');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// Define port where app will listen
var port = process.env.PORT || 8080;

// Define router usage
app.use('/', router_main);
app.use('/api', router_api);
app.use('/auth', router_auth);

// Make app listen
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
