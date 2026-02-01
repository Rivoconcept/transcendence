// /home/rhanitra/GITHUB/transcendence/ft_transcendence/srcs/frontend/src/cardScenes/CardScene.tsx

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";
import BackCard from "./CardBack";
import PhaseButton from "../components/ui/PhaseButton";
import { useCardState } from "../context/cardGame/CardContext";
import { useCardGameState } from "../context/cardGame/CardGameContext";
// import { ProgressBar } from "../components/cards/ProgressBarScore";
import ProgressCircleTimer from "../components/cards/ProgressCircleTimer";
import { ProgressBar } from "../components/cards/ProgressBarScore";
import ScoreList from "../components/cards/ScoreList";


type Phase = "BEGIN" | "SHUFFLE" | "PLAY";

export default function CardScene() {
  const [phase, setPhase] = useState<Phase>("BEGIN");
  const { cards, score, reset } = useCardState();
  const { playTurn, isWin, isLose, turn } = useCardGameState();
  const [scores, setScores] = useState<number[]>([]);

  const onButtonClick = () => {
    if (phase === "BEGIN") {
      setPhase("SHUFFLE");

    } else if (phase === "SHUFFLE") {
      playTurn();      // 👈 IMPORTANT
      setPhase("PLAY");

    } else if (phase === "PLAY") {
      reset();         // reset cards
      setPhase("BEGIN");
    }
  };

  useEffect(() => {
    if (score !== null) {
      setScores(prev => [...prev, score]);
    }
  }, [score]);

  const totalScore = scores.reduce((sum, s) => sum + s, 0);

  return (
    <>
      {/* CARDS */}
      <div className="cardScene">
        <div className="cardsRow">
          {[0, 1, 2].map(i => (
            <div key={i} className="cardSlot">
              <Canvas camera={{ position: [0, 1.5, 5] }} className="cardCanvas">
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} />
                {phase === "BEGIN" && <BackCard />}
                {phase === "SHUFFLE" && <ShuffleCard />}
                {phase === "PLAY" && cards?.[i] && (
                  <RevealCard key={`reveal-${cards[i].id}`} cardId={cards[i].id} />
                )}
              </Canvas>
            </div>
          ))}

            <div className="dashboard">
              <div className="card-group">
                <div className="card border-0 bg-black text-light">
                  <div className="card-body">
                    <div className="avatar">
                      <img src="/avatar.png" alt="avatar" />
                    </div>
                  </div>
                </div>
                <div className="card border-0 bg-black text-light">

                  <div className="card-body">
                    <div className="circleTimer">
                      <ProgressCircleTimer />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="separator"/>
              {/* PROGRESS BAR */}
              <div className="progressBarScore">
                <div className="progressTile">
                  <span className="label">PROGRESS</span>
                  <span className="turn">{turn} / 5</span>
                </div>
                <ProgressBar />
              </div>
              <div className="card-group">
                <div className="card border-0 bg-black text-light">
                  <div className="card-body">
                    <ul className="scoreLists">
                      {scores.map((s, i) => (
                        <ScoreList key={i} score={s} round={i + 1} />
                      ))}
                    </ul>
                    <div className="separatorLine" />
                    <div className="totalScore">
                      <p>Score <span>{totalScore}</span></p>
                    </div>
                  </div>
                </div>
                <div className="card border-0 bg-black text-light">

                  <div className="card-body">
                    {isWin && <><h2 className="win">🎉 </h2> <h2 className="win">You Win!</h2></>}
                    {isLose && !isWin && <> <span className="lose">💀</span> <span className="lose">Perdu</span></>}
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <div className="separatorBottom">
                <hr className="separator"/>
              </div>
              <div className="cardButton">
                <PhaseButton phase={phase} onClick={onButtonClick} />
              </div>
            </div>
        </div>
      </div>

    </>
  );

}
