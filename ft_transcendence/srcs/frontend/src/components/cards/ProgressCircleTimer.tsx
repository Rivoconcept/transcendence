import { useCardGameState } from "../../context/cardGame/CardGameContext";

type Props = {
  size?: number;
  strokeWidth?: number;
};

export default function ProgressCircleTimer({
  size = 180,
  strokeWidth = 16,
}: Props) {
  const { timeLeft, maxTime } = useCardGameState();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft / maxTime;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#222"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={timeLeft > maxTime * 0.5 ? "#06f762" : timeLeft > maxTime * 0.25 ? "#ffb703" : "#ff3b3b"}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size / 5}
        fill="#fceb05"
        fontWeight="bold"
      >
        {timeLeft}s
      </text>
    </svg>
  );
}
