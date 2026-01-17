import { useState, useEffect, useRef } from "react";
import { connectWebSocket } from './websocket'
import CardScene from "./scenes/CardScene";
import Test from "./Test";
import Fruit from "./Fruit";
import { FruitProvider } from "./context/FruitContext";
import OtherFruit from "./OtherFruit";
import { proofByNine } from "./utils/proofByNine";

function CardGame() {
  const [cards, setCards] = useState<number[]>([]);

  const drawCards = () => {
    const drawn = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 13) + 1
    );
    setCards(drawn);
  };

  const score =
    cards.length === 3
      ? proofByNine(cards.reduce((s, v) => s + v, 0))
      : null;

  return (
     <>
        <CardScene cards={cards} />

        {score !== null && (
          <div style={{ textAlign: "center", fontSize: 22, marginTop: 10 }}>
            Score : {score}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={drawCards} style={{ padding: "12px 20px", fontSize: 18 }}>
            Tirer les cartes
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
