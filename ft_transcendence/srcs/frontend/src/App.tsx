import { useState, useEffect } from "react";
import { connectWebSocket } from './websocket'
import CardScene from "./scenes/CardScene";
import { CardProvider } from "./context/CardContext";
import Test from "./Test";
import Fruit from "./Fruit";
import { FruitProvider } from "./context/FruitContext";
import OtherFruit from "./OtherFruit";

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
      <div style={{ width: "50vw", height: "50vh" }}> <CardScene forcedCard={cardId} /> </div>

      {/* <div style={{ width: "50vw", height: "50vh" }}>
        <CardProvider>
          <CardScene forcedCard={cardId} />
        </CardProvider>
      </div> */}
        <div>
            <Test/>
        </div>
        <div>
            <OtherFruit/>
        </div>
        <FruitProvider>
            <Fruit />
        </FruitProvider>
     </>

  );
}

export default App;
