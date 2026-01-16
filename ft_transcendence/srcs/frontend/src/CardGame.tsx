import { useState, useEffect, useRef } from "react";
import { connectWebSocket } from './websocket'
import CardScene from "./scenes/CardScene";
import Test from "./Test";
import Fruit from "./Fruit";
import { FruitProvider } from "./context/FruitContext";
import OtherFruit from "./OtherFruit";
import { proofByNine } from "./utils/proofByNine";

function CardGame() {
  const [cardIds, setCardIds] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = connectWebSocket((msg) => {
      console.log("⬅️ WS reçu :", msg);
      if (msg.type === "NEW_CARDS") {
        setCardIds(msg.cards); // ex: ["1", "11", "5"]
      }
    });

    wsRef.current = ws;
    return () => ws.close();
  }, []);

  const requestDraw = () => {
    console.log("➡️ DRAW_CARDS envoyé");
    wsRef.current?.send(
      JSON.stringify({ type: "DRAW_CARDS" })
    );
    setCardIds([]); // reset → shuffle visible
  };

  
  const score = cardIds.length === 3 ? proofByNine( cardIds.reduce((s, id) => s + Number(id), 0) ) : null;

  return (
     <>
      <CardScene cards={cardIds} />
      {score !== null && (
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          Score : {score}
        </div>
      )}

      {/* 🎯 bouton central */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={requestDraw}
          style={{
            padding: "12px 20px",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          🎲 Tirer les cartes
        </button>
      </div>

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

export default CardGame;
