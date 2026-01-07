import "reflect-metadata";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 3000;

// HTTP route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({
  server,
  path: "/ws",
});

wss.on("connection", (ws) => {
  console.log("🟢 WebSocket client connected");

  // test message
  ws.send(
    JSON.stringify({
      type: "NEW_CARD",
      card: "1",
    })
  );

  ws.on("message", (msg) => {
    console.log("📩 WS message:", msg.toString());
  });

  ws.on("close", () => {
    console.log("🔌 WebSocket client disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
