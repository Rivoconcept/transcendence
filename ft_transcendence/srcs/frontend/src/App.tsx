import { useState, useEffect } from "react";
import { connectWebSocket } from './websocket'
// import CardScene from "./scenes/CardScene";
import Test from "./Test";
import Fruit from "./Fruit";

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
         {/* <div style={{ width: "50vw", height: "50vh" }}>
            <CardScene forcedCard={cardId} />
            
        </div> */}
        <div>
            <Test/>
        </div>
        <div>
            <Fruit/>
        </div>
     </>

  );
}

export default App;
