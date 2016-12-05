var bodyParser = require("body-parser");
var express = require('express');
var expressWs = require('express-ws');

var router_main = require('./routes/main');
var router_api = require('./routes/api');
var router_auth = require('./routes/auth');

var app = express();
var wsApp = expressWs(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// Define port where app will listen
var port = process.env.PORT || 8080;

// Define router usage
app.use('/', router_main);
app.use('/api', router_api);
app.use('/auth', router_auth);

// Init connections array
var connectionsArray = [];

// Define WebSockets server path
app.ws('/:user', function (ws, req) {
  var user = req.params.user;

  connectionsArray.push({ user: user, ws: ws });
  console.log("User " + user + " logged in");

  // Notify new connection broadcast
  connectionsArray.forEach(function (connection) {
    connection.ws.send(JSON.stringify({ user: user, msg: "connected" }));
  });

  // Send new message broadcast
  ws.on('message', function (msg) {
    console.log(msg);
    connectionsArray.forEach(function (connection) {
      connection.ws.send(JSON.stringify({ user: user, msg: msg }));
    });
  });

  // Notify user disconnection broadcast
  ws.on('close', function close() {
    console.log("User " + user + " logged out");

    connectionsArray.forEach(function (connection, index) {
      if (connection.user == user) {
        connectionsArray.splice(index, 1);
      } else {
        connection.ws.send(JSON.stringify({ user: user, msg: "disconnected" }));
      }
    });
  });
});

// Make app listen
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
