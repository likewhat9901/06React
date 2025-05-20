const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log("새 연결됨!");

  ws.on('message', (message) => {
    console.log("받은 메시지:", message);

    // 모든 클라이언트에게 메시지 전송
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});