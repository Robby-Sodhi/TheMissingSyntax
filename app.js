import { WebSocketServer , WebSocket} from 'ws';

var express = require('express');
var app = express();

const wss = new WebSocketServer({ port: 8000 });

var text = "";

wss.on('connection', function connection(ws) {
    ws.send(text);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    text = message;
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(text);
    }})
    console.log('sent: ', text);
  });
});