import { WebSocketServer, WebSocket } from "ws";
import { generatePin } from "./Modules/functions.js";
import express from "express";
import { createServer } from "http";
import { parse } from "url";

var app = express();

const server = createServer();

var rooms = {};

app.get("/createRoom", function (req, res) {
  var pin = generatePin().toString();
  rooms[pin] = new WebSocketServer({ noServer: true });
  rooms[pin].on("connection", function connection(ws) {
    ws.send(rooms[pin]["text"]);
    ws.on("message", function incoming(message) {
      rooms[pin]["text"] = message;
      rooms[pin].clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(rooms[pin]["text"]);
        }
      });
    });
  });
  res.send(pin);
});

app.listen(9000);

server.on("upgrade", function upgrade(request, socket, head) {
  let pathname = request.url.substring(1);
  if (pathname in rooms) {
    rooms[pathname].handleUpgrade(request, socket, head, function done(ws) {
      rooms[pathname].emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8000);
