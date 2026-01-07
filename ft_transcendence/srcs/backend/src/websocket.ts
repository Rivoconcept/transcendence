import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log('Received:', message);
  });

  ws.send('Hello client!');
  ws.send(JSON.stringify({
    type: "NEW_CARD",
    card: "1"
  }));
});
