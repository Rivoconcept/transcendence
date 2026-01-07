import { Canvas } from "@react-three/fiber";
import Card3D from "../components/cards/Card3D";
import { useState, useEffect } from "react";

type Props = {
  wsCard: string | null; // carte finale à afficher
};

export default function CardScene({ wsCard }: Props) {
  const [targetCard, setTargetCard] = useState("1");

  useEffect(() => {
    if (wsCard) setTargetCard(wsCard);
  }, [wsCard]);

  return (
    <Canvas camera={{ position: [0, 1.5, 5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <Card3D targetCardId={targetCard} shuffleSpeed={0.15} />
    </Canvas>
  );
}
