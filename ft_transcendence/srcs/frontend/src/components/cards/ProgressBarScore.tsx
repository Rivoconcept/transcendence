
import { useCardGameState } from "../../context/cardGame/CardGameContext";

export function ProgressBar() {
  const { progress } = useCardGameState();


  return (
    <div className="progressBarContainer">
      <div
        className="progressBarFill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
