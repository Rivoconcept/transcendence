import LinearProgress from "@mui/material/LinearProgress";
import { useCardState } from "../context/CardContext";

export function ProgressBar() {
  const { progress } = useCardState();

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{ height: 10, borderRadius: 5 }}
    />
  );
}
