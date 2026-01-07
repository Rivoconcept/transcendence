import { useState, useEffect } from "react";
import { connectWebSocket } from './websocket'
import CardScene from "./scenes/CardScene";

function App() {
  const [cardId, setCardId] = useState("1");

  useEffect(() => {
    const ws = connectWebSocket((msg) => {
      if (msg.type === "NEW_CARD") {
        setCardId(msg.card);
      }
    });

    return () => ws.close();
  }, []);

  return (
     <>
         <div style={{ width: "50vw", height: "50vh" }}>
            <CardScene forcedCard={cardId} />
        </div>
        <div>test</div>
     </>

  );
}

export default App;
