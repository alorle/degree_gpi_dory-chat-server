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

// Init clients array
var clients = [];

// Define WebSockets server path
app.ws('/:user', function (ws, req) {
  var userId = req.params.user;

  console.log("New connection " + userId);

  clients.push({ ws: ws, userId: userId });

  // Notify new connection broadcast
  clients.forEach(function (client) {
    client.ws.send(userId + " se ha conectado");
  });

  // Send new message broadcast
  ws.on('message', function (msg) {
    clients.forEach(function (client) {
      client.ws.send(msg);
    });
  });

  // Notify user disconnection broadcast
  ws.on('close', function close() {
    console.log("User " + userId + " logged out");

    clients.forEach(function (client, index) {
      if (client.userId == userId) {
        clients.splice(index, 1);
      } else {
        client.ws.send(userId + " se ha desconectado");
      }
    });
  });
});

// Make app listen
app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
