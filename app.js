var express = require('express');
var app = express();
var stringify = require('json-stringify');

var port = process.env.PORT || 8080;
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text: "hola soy un mensaje",
  author: "emir"}];

app.use(express.static('public'));


io.on('connection', function(socket){
  console.log("Alguien se conecto con socket");
  socket.emit('messages',messages);
  socket.on('new-message', function(data){
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
});

server.listen(port, function(){
  console.log("Servidor corriendo ok");
});
