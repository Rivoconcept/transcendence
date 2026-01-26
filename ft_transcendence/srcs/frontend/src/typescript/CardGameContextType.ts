export type GameContextType = {
  turn: number;
  maxTurns: number;
  totalScore: number;
  progress: number;
  timeLeft: number;
  playTurn: () => void;
  resetGame: () => void;
  isWin: boolean;
  isLose: boolean;
};
