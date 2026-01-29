// /home/rhanitra/GITHUB/transcendence/ft_transcendence/srcs/frontend/src/cardScenes/CardScene.tsx

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";
import BackCard from "./CardBack";
import PhaseButton from "../components/ui/PhaseButton";
import { useCardState } from "../context/cardGame/CardContext";
import { useCardGameState } from "../context/cardGame/CardGameContext";
// import { ProgressBar } from "../components/cards/ProgressBarScore";
import ProgressCircleTimer from "../components/cards/ProgressCircleTimer";


type Phase = "BEGIN" | "SHUFFLE" | "PLAY";

export default function CardScene() {
  const [phase, setPhase] = useState<Phase>("BEGIN");
  const { cards, score, reset } = useCardState();
  const { playTurn, isWin, isLose, turn } = useCardGameState();


  const onButtonClick = () => {
    if (phase === "BEGIN") {
      setPhase("SHUFFLE");

    } else if (phase === "SHUFFLE") {
      playTurn();      // 👈 IMPORTANT
      setPhase("PLAY");

    } else if (phase === "PLAY") {
      reset();         // reset cartes
      setPhase("BEGIN");
    }
  };


  return (
    <>
      {/* CARTES */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, height: "50vh" }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ width: "15vw", height: "100%" }}>
            <Canvas camera={{ position: [0, 1.5, 5] }} style={{ background: "#000" }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} />

              {phase === "BEGIN" && <BackCard />}
              {phase === "SHUFFLE" && <ShuffleCard />}
              {phase === "PLAY" && cards && cards[i] && (
                <RevealCard key={`reveal-${cards[i].id}`} cardId={cards[i].id} />
              )}
              { <ProgressCircleTimer />}

            </Canvas>
          </div>
        ))}
      </div>

      {/* SCORE DU TIRAGE */}
      {score !== null && (
        <div style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}>
          Score du tour : {score}
        </div>
      )}

      {/* INFOS PARTIE */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        Tour : {turn} / 5
      </div>


      {/* BARRE DE PROGRESSION */}
      <div style={{ width: "60%", margin: "20px auto" }}>
        {/* <ProgressBar /> */}
      </div>

      {/* VICTOIRE / DÉFAITE */}
      {isWin && <h2 style={{ textAlign: "center", color: "lime" }}>🎉 Gagné !</h2>}
      {isLose && !isWin && <h2 style={{ textAlign: "center", color: "red" }}>💀 Perdu</h2>}

      {/* BOUTON */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <PhaseButton phase={phase} onClick={onButtonClick} />
      </div>
    </>
  );

}
