voici mes codes :
// /home/rivoinfo/Documents/DEV/transcendence/ft_transcendence/srcs/frontend/src/typescript/CardContextType.ts

export type Card = {
  id: string;
  value: number;
  texture: string;
};

export const CARDS: Card[] = [
  { id: "1",  value: 1,  texture: "/diamonds/1.png" },
  { id: "2",  value: 2,  texture: "/diamonds/2.png" },
  { id: "3",  value: 3,  texture: "/diamonds/3.png" },
  { id: "4",  value: 4,  texture: "/diamonds/4.png" },
  { id: "5",  value: 5,  texture: "/diamonds/5.png" },
  { id: "6",  value: 6,  texture: "/diamonds/6.png" },
  { id: "7",  value: 7,  texture: "/diamonds/7.png" },
  { id: "8",  value: 8,  texture: "/diamonds/8.png" },
  { id: "9",  value: 9,  texture: "/diamonds/9.png" },
  { id: "10", value: 10, texture: "/diamonds/10.png" },
  { id: "11", value: 11, texture: "/diamonds/11.png" },
  { id: "12", value: 12, texture: "/diamonds/12.png" },
  { id: "13", value: 13, texture: "/diamonds/13.png" },
];

export type DrawnCard = {
  id: string;
  value: number;
};

export type CardContextType = {
  cards: DrawnCard[] | null;
  score: number | null;
  drawAll: () => void;
  reset: () => void;
};

import { atom } from "jotai";
import { proofByNine } from "../utils/proofByNine";
import type { DrawnCard } from "../typescript/CardContextType";

/**
 * Atom qui contient les cartes tirées
 * (on ne remplace pas encore le CardContext)
 */
export const drawnCardsAtom = atom<DrawnCard[] | null>(null);

/**
 * Atom dérivé : calcule le score automatiquement
 */
export const scoreAtom = atom<number | null>((get) => {
  const cards = get(drawnCardsAtom);
  if (!cards || cards.length !== 3) return null;

  const sum = cards.reduce((s, c) => s + c.value, 0);
  return proofByNine(sum);
});

// /home/rhanitra/GITHUB/transcendence/ft_transcendence/srcs/frontend/src/typescript/CardGameContextType.ts

export type CardGameContextType = {
  turn: number;
  maxTurns: number;
  totalScore: number;
  progress: number;
  timeLeft: number;
  maxTime: number;
  playTurn: () => void;
  resetGame: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  addTime: (sec: number) => void;
  isWin: boolean;
  isLose: boolean;
};

// /home/rhanitra/GITHUB/transcendence/ft_transcendence/srcs/frontend/src/context/CardContext.tsx

import { createContext, useContext, useState } from "react";
import { CARDS } from "../typescript/CardContextType";
import type { CardContextType } from "../typescript/CardContextType";
import { drawnCardsAtom } from "../state/CardGameAtoms";
import { useSetAtom } from "jotai";


const CardContext = createContext<CardContextType | null>(null);

export function CardContextProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<CardContextType["cards"]>(null);
  const setDrawnCards = useSetAtom(drawnCardsAtom);

  const drawAll = () => {
    const allCardsRandomOrder = [...CARDS].sort(() => Math.random() - 0.5);
    const drawn = allCardsRandomOrder.slice(0, 3).map(c => ({
      id: c.id,
      value: c.value,
    }));

    setCards(drawn);
    setDrawnCards(drawn);
  };

  const reset = () => {
    setCards(null);
    setDrawnCards(null);
  };

  const score = null;

  return (
    <CardContext.Provider value={{ cards, score, drawAll, reset }}>
      {children}
    </CardContext.Provider>
  );
}


/* ---------- CUSTOM HOOK ---------- */

export function useCardState() {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error("useCardState must be used within CardContextProvider");
  }
  return ctx;
}

import { createContext, useContext, useEffect, useState } from "react";
import { useCardState } from "./CardContext";
import type { CardGameContextType } from "../typescript/CardGameContextType";

const GameContext = createContext<CardGameContextType | null>(null);

const MAX_TURNS = 5;
const MAX_SCORE = 27;
const TIME_LIMIT = 30;

export function CardGameContextProvider({ children }: { children: React.ReactNode }) {
  const { drawAll, score, reset: resetCards } = useCardState();

  const [turn, setTurn] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /* ================= TIMER GAME LOOP ================= */
  useEffect(() => {
    if (!isTimerRunning) return;
    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  /* ================= GAMEPLAY ================= */

  const playTurn = () => {
    if (turn >= MAX_TURNS || timeLeft <= 0) return;
    drawAll();
    setTurn(t => t + 1);
    setIsTimerRunning(true); // démarre le timer au premier tour
  };

  useEffect(() => {
    if (score !== null) setTotalScore(s => s + score);
  }, [score]);

  const progress = Math.min((totalScore / MAX_SCORE) * 100, 100);
  const isWin = progress >= 100 && timeLeft > 0;
  const isLose = timeLeft <= 0 || turn >= MAX_TURNS;

  useEffect(() => {
    if (isWin || isLose) setIsTimerRunning(false);
  }, [isWin, isLose]);

  const resetGame = () => {
    setTurn(0);
    setTotalScore(0);
    setTimeLeft(TIME_LIMIT);
    setIsTimerRunning(false);
    resetCards();
  };

  return (
    <GameContext.Provider
      value={{
        turn,
        maxTurns: MAX_TURNS,
        totalScore,
        progress,
        timeLeft,
        maxTime: TIME_LIMIT,
        playTurn,
        resetGame,
        isWin,
        isLose,
        pauseTimer: () => setIsTimerRunning(false),
        resumeTimer: () => setIsTimerRunning(true),
        addTime: (sec: number) => setTimeLeft(t => Math.min(t + sec, TIME_LIMIT)),
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useCardGameState() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useCardGameState must be used within CardGameContextProvider");
  return ctx;
}

// /home/rhanitra/Documents/DEV/transcendence/ft_transcendence/srcs/frontend/src/cardScenes/CardGameDashboard.tsx

import { useEffect, useState } from "react";
import PhaseButton from "../components/ui/PhaseButton";
import { useCardState } from "../cardGamecontext/CardContext";
import { useCardGameState } from "../cardGamecontext/CardGameContext";
import ProgressCircleTimer from "../components/cards/ProgressCircleTimer";
import { ProgressBar } from "../components/cards/ProgressBarScore";
import ScoreList from "../components/cards/ScoreList";
import { useAtomValue } from "jotai";
import { scoreAtom } from "../state/CardGameAtoms";


type Phase = "BEGIN" | "SHUFFLE" | "PLAY";

interface CardGameDashboardProps {
  phase: Phase;
  setPhase: (phase: Phase) => void;
}

export default function CardGameDashboard({ phase, setPhase }: CardGameDashboardProps) {
  const { reset } = useCardState();
  const score = useAtomValue(scoreAtom);

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
                {isLose && !isWin && <> <span className="lose">💀</span> <span className="lose">You lose!</span></>}
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
    </>
  );

}

// /home/rhanitra/GITHUB/transcendence/ft_transcendence/srcs/frontend/src/cardScenes/CardScene.tsx

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";
import BackCard from "./CardBack";
import { useCardState } from "../cardGamecontext/CardContext";
import CardGameDashboard from "./CardGameDashboard";



type Phase = "BEGIN" | "SHUFFLE" | "PLAY";

export default function CardScene() {
  const [phase, setPhase] = useState<Phase>("BEGIN");
  const { cards } = useCardState();


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
            
          <CardGameDashboard phase={phase} setPhase={setPhase} />
        </div>
      </div>

    </>
  );

}
