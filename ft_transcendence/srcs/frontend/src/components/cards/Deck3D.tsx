// Deck3D.tsx

import { useRef, useState } from "react";
import { Group } from "three";
import Card3D from "./Card3D";

const DECK_SIZE = 10; // commence petit, extensible à 52

export default function Deck3D() {
  const groupRef = useRef<Group>(null!);
  const [shuffling, setShuffling] = useState(false);

  const shuffleDeck = () => {
    if (shuffling) return;
    setShuffling(true);

    // animation simple (rotation du deck)
    let frame = 0;
    const animate = () => {
      frame++;
      groupRef.current.rotation.y += 0.2;
      groupRef.current.rotation.x += 0.1;

      if (frame < 30) {
        requestAnimationFrame(animate);
      } else {
        groupRef.current.rotation.set(0, 0, 0);
        setShuffling(false);
      }
    };

    animate();
  };

  return (
    <group ref={groupRef} onClick={shuffleDeck}>
      {Array.from({ length: DECK_SIZE }).map((_, i) => (
        <Card3D
          key={i}
          position={[0, i * 0.03, 0]} // pile de cartes
        />
      ))}
    </group>
  );
}
