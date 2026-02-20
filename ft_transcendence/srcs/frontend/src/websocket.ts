import { io, Socket } from "socket.io-client";

let socket: Socket;

export function connectSocket(token: string) {
  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("✅ Socket.IO connecté");

    // AUTH obligatoire
    socket.emit("auth", token);
  });

  socket.on("auth:success", (data) => {
    console.log("🔐 Auth OK:", data);
  });

  socket.on("auth:error", (err) => {
    console.error("❌ Auth failed", err);
  });

  return socket;
}

export function getSocket() {
  return socket;
}
