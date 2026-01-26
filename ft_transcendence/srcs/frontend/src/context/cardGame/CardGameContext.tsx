import { createContext, useContext, useEffect, useState } from "react";
import { useCardState } from "./CardContext";

const GameContext = createContext<cardGameContextType | null>(null);

const MAX_TURNS = 5;
const MAX_SCORE = 27;
const TIME_LIMIT = 30;

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { drawAll, score, reset: resetCards } = useCardState();

  const [turn, setTurn] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  /* ---------- TIMER ---------- */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ---------- PLAY TURN ---------- */
  const playTurn = () => {
    if (turn >= MAX_TURNS || timeLeft <= 0) return;

    drawAll();           // 👉 appelle CardContext
    setTurn(t => t + 1);
  };

  /* ---------- SYNC SCORE ---------- */
  useEffect(() => {
    if (score !== null) {
      setTotalScore(s => s + score);
    }
  }, [score]);

  const progress = Math.min((totalScore / MAX_SCORE) * 100, 100);

  const resetGame = () => {
    setTurn(0);
    setTotalScore(0);
    setTimeLeft(TIME_LIMIT);
    resetCards();
  };

  const isWin = progress >= 100 && timeLeft > 0;
  const isLose = timeLeft <= 0 || turn >= MAX_TURNS;

  return (
    <GameContext.Provider
      value={{
        turn,
        maxTurns: MAX_TURNS,
        totalScore,
        progress,
        timeLeft,
        playTurn,
        resetGame,
        isWin,
        isLose,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
