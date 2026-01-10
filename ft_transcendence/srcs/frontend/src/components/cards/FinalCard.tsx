// src/components/cards/FinalCard.tsx
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useCard } from "../../context/CardContext";
import { CARDS } from "../../utils/cards";

export default function FinalCard({ shuffleSpeed = 0.15 }) {
  const { finalCardId } = useCard();
  const mesh = useRef<THREE.Mesh>(null!);

  const frontTextures = CARDS.map(c => useLoader(TextureLoader, c.texture));
  const backTexture = useLoader(TextureLoader, "/diamonds/back.png");

  const rotation = useRef(0);
  const finished = useRef(false);

  const currentIndex = CARDS.findIndex(c => c.id === finalCardId);

  useFrame(() => {
    if (!finalCardId || finished.current || !mesh.current) return;

    rotation.current += shuffleSpeed;
    mesh.current.rotation.y = rotation.current;

    if (rotation.current >= Math.PI) {
      rotation.current = 0;
      finished.current = true;
    }
  });

  if (currentIndex === -1) return null;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={frontTextures[currentIndex]} side={THREE.DoubleSide} />
    </mesh>
  );
}
