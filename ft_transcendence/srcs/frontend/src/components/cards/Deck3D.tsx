// // Deck3D.tsx

import { useRef, useState } from "react";
import { Group } from "three";
import Card3D from "./Card3D";
import { CARDS } from "../../utils/cards";

const DECK_SIZE = 10;

export default function Deck3D({ finalCardId }: { finalCardId?: string }) {
  const groupRef = useRef<Group>(null!);
  const [shuffling, setShuffling] = useState(false);

  const shuffleDeck = () => {
    if (shuffling) return;
    setShuffling(true);

    // animation visuelle du deck (optionnelle)
    setTimeout(() => setShuffling(false), 2000);
  };

  return (
    <group ref={groupRef} onClick={shuffleDeck}>
      {Array.from({ length: DECK_SIZE }).map((_, i) => (
        <Card3D
          key={i}
          targetCardId={i === DECK_SIZE - 1 ? finalCardId : undefined} // dernière carte = reveal
        />
      ))}
    </group>
  );
}
