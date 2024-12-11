import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
app.get("/", (req: any, res: any) => {
  res.send("hi from express");
});
const server = app.listen(8080, () => {
  console.log(new Date() + "Server is runnig at port 8080");
});
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
        console.log(`data received is ` + data);
      }
    });
  });

  ws.send("Hello! Message From Server!!");
});

// server.listen(8080, function () {
//   console.log(new Date() + " Server is listening on port 8080");
// });
