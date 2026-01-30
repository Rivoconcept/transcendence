type Props = {
  score: number;
  round: number;
};

export default function ScoreList({ score, round }: Props) {
  return (
    <li className="scoreList">
      Round ({round}) ......... {score}
    </li>
  );
}
