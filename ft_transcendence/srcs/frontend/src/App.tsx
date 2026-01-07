import { useEffect } from "react";
import { connectWebSocket } from "./websocket";
import CardScene from "./scenes/CardScene";

function App() {
  useEffect(() => {
    const ws = connectWebSocket();
    return () => ws.close();
  }, []);

  return (
    <div style={{ width: "20vw", height: "20vh" }}>
      <CardScene />
    </div>
  );
}

export default App;
