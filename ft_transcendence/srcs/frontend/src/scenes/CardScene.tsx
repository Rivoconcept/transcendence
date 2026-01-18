import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";
import { CARDS } from "../utils/cards";
import { proofByNine } from "../utils/proofByNine";
import BackCard from "./CardBack";
import PhaseButton from "../components/ui/PhaseButton";

type Phase = "BEGIN" | "SHUFFLE" | "PLAY";

export default function CardScene() {
  const [phase, setPhase] = useState<Phase>("BEGIN");
  const [cards, setCards] = useState<{ id: string; value: number }[] | null>(null);

  // ← UNE SEULE FONCTION
  const onButtonClick = () => {
    if (phase === "BEGIN") {
      setPhase("SHUFFLE");
    } else if (phase === "SHUFFLE") {
      const shuffled = [...CARDS].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, 3);
      setCards(drawn.map(c => ({ id: c.id, value: c.value })));
      setPhase("PLAY");
    } else if (phase === "PLAY") {
      setCards(null);
      setPhase("BEGIN");
    }
  };

  const score =
    phase === "PLAY" && cards
      ? proofByNine(cards.reduce((s, c) => s + c.value, 0))
      : null;

  return (
    <>

     {/* CARTES */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, height: "50vh"}}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: "15vw", height: "100%" }}>
            <Canvas camera={{ position: [0, 1.5, 5] }}  gl={{ antialias: true, alpha: false }}
  style={{ background: '#000000'}}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} />

              {phase === "BEGIN" && <BackCard />}
              {phase === "SHUFFLE" && <ShuffleCard />}
              {phase === "PLAY" && cards && cards[i] && (
                <RevealCard key={`reveal-${phase}-${cards[i].id}`} cardId={cards[i].id} />
              )}
            </Canvas>
          </div>
        ))}
      </div>

      {/* SCORE */}
      {score !== null && (
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}>Score : {score}</div>
      )}

      {/* BOUTON */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <PhaseButton phase={phase} onClick={onButtonClick} />
      </div>
    </>
  );
}
