// // websocket.ts
// let ws: WebSocket;

// export function connectWebSocket(setWsCard: (id: string) => void) {
//   ws = new WebSocket("ws://localhost:3000/ws");

//   ws.onopen = () => console.log("✅ WebSocket connecté");

//   ws.onmessage = (e) => {
//     const msg = JSON.parse(e.data);
//     if (msg.type === "DRAW_CARD") {
//       setWsCard(msg.card); // déclenche animation
//     }
//   };

//   ws.onclose = () => console.log("🔌 WebSocket fermé");
//   ws.onerror = () => console.warn("⚠️ WebSocket erreur");

//   return ws;
// }

let socket: WebSocket | null = null;

export function connectWebSocket(onMessage: (msg: any) => void) {
  if (socket && socket.readyState === WebSocket.OPEN) return socket;

  socket = new WebSocket("ws://localhost:3000/ws");

  socket.onopen = () => console.log("✅ WebSocket connecté");
  socket.onerror = () => console.log("⚠️ WebSocket erreur");
  socket.onclose = () => console.log("🔌 WebSocket fermé");

  socket.onmessage = e => onMessage(JSON.parse(e.data));

  return socket;
}
