// ✅ bon
import LinearProgress from "@mui/material/LinearProgress";
import { useCardGameState } from "../../context/cardGame/CardGameContext";

export function ProgressBar() {
  const { progress } = useCardGameState();

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{ height: 10, borderRadius: 5 }}
    />
  );
}
