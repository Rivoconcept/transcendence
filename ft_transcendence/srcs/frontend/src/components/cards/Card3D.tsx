// Card3D.tsx

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh } from "three";
import { useRef } from "react";

type Card = {
  id: string;
  texture: string;
};

type Props = {
  card: Card;
  onRotationComplete: () => void;
};

export default function Card3D({ card, onRotationComplete }: Props) {
  const ref = useRef<Mesh>(null!);
  const texture = useLoader(TextureLoader, card.texture);

  let rotationY = 0;

  useFrame((_, delta) => {
    rotationY += delta * 2;
    ref.current.rotation.y = rotationY;

    // rotation complète (2π)
    if (rotationY >= Math.PI * 2) {
      rotationY = 0;
      onRotationComplete(); // 🔥 changer la carte
    }
  });

  return (
    <mesh ref={ref} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
