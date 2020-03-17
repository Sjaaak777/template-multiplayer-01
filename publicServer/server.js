'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('I am the server');

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

app.set('port', 5000);
app.use('/', _express2.default.static(_path2.default.join(__dirname + '/../public')));

server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

var players = {};
io.on('connection', function (socket) {
  socket.on('new player', function () {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', function (data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});

setInterval(function () {
  io.sockets.emit('state', players);
}, 1000 / 60);