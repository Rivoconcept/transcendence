// src/components/cards/ShuffleCard.tsx
import { useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { CARDS } from "../../utils/cards";
import { useCard } from "../../context/CardContext";

export default function ShuffleCard() {
  const { shuffling, setShuffling, finalCardId } = useCard();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const frontTextures = CARDS.map(c => useLoader(TextureLoader, c.texture));
  const backTexture = useLoader(TextureLoader, "/diamonds/back.png");

  // Shuffle logic
  useEffect(() => {
    if (!shuffling) return; // démarre seulement quand setShuffling(true) est appelé

    const timer = setInterval(() => {
      setShowBack(prevShowBack => {
        const nextShowBack = !prevShowBack;
        if (!nextShowBack) setCurrentIndex(prev => (prev + 1) % CARDS.length);
        return nextShowBack;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [shuffling]);


  // Stop shuffle when finalCardId is set
  useEffect(() => {
    if (finalCardId) setShuffling(false);
  }, [finalCardId]);

  const currentTexture = showBack ? backTexture : frontTextures[currentIndex];

  return (
    <mesh>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={currentTexture} side={THREE.DoubleSide} />
    </mesh>
  );
}

