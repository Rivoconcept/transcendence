// src/scenes/CardScene.tsx
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";
import { CARDS } from "../utils/cards";
import { proofByNine } from "../utils/proofByNine";
import BackCard from "./CardBack";

type Phase = "IDLE" | "SHUFFLE" | "DRAW";

export default function CardScene() {
  const [phase, setPhase] = useState<Phase>("IDLE");
  const [cards, setCards] = useState<
    { id: string; value: number }[] | null
  >(null);

  const onButtonClick = () => {
    if (phase === "IDLE") {
      setPhase("SHUFFLE");
    }

    else if (phase === "SHUFFLE") {
      const shuffled = [...CARDS].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, 3);

      setCards(
        drawn.map(c => ({
          id: c.id,
          value: c.value,
        }))
      );

      setPhase("DRAW");
    }

    else if (phase === "DRAW") {
      setCards(null);
      setPhase("IDLE");
    }
  };

  const score =
    phase === "DRAW" && cards
      ? proofByNine(cards.reduce((s, c) => s + c.value, 0))
      : null;

  const buttonLabel =
    phase === "IDLE"
      ? "🔀 Shuffle"
      : phase === "SHUFFLE"
      ? "🎯 Draw"
      : "🔁 Restart";

  return (
    <>
      {/* 🃏 CARTES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          height: "50vh",
        }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: "15vw", height: "100%" }}>
            <Canvas camera={{ position: [0, 1.5, 5] }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} />

              {phase === "IDLE" && <BackCard />}
              {phase === "SHUFFLE" && <ShuffleCard />}
              {phase === "DRAW" && cards && (
                <RevealCard cardId={cards[i].id} />
              )}
            </Canvas>
          </div>
        ))}
      </div>

      {/* 📊 SCORE */}
      {score !== null && (
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
          Score : {score}
        </div>
      )}

      {/* 🎯 BOUTON */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={onButtonClick}
          style={{ padding: "12px 24px", fontSize: 18 }}
        >
          {buttonLabel}
        </button>
      </div>
    </>
  );
}
