import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { CARDS } from "../../utils/cards";

type Props = {
  targetCardId: string; // carte finale
  shuffleSpeed?: number;
};

export default function Card3D({ targetCardId, shuffleSpeed = 0.15 }: Props) {
  const mesh = useRef<THREE.Mesh>(null!);

  // précharger toutes les textures
  const frontTextures = useMemo(
    () => CARDS.map(c => useLoader(TextureLoader, c.texture)),
    []
  );
  const backTexture = useLoader(TextureLoader, "/back.png");

  const [currentIndex, setCurrentIndex] = useState(0);
  const rotation = useRef(0);
  const halfDone = useRef(false);
  const finished = useRef(false);

  useEffect(() => {
    // reset quand nouvelle carte cible
    rotation.current = 0;
    halfDone.current = false;
    finished.current = false;
    setCurrentIndex(0);
    if (mesh.current) mesh.current.rotation.y = 0;
  }, [targetCardId]);

  useFrame(() => {
    if (!mesh.current || finished.current) return;

    rotation.current += shuffleSpeed;
    mesh.current.rotation.y = rotation.current;

    // mi-rotation → changer carte
    if (!halfDone.current && rotation.current >= Math.PI / 2) {
      halfDone.current = true;

      if (CARDS[currentIndex].id !== targetCardId) {
        setCurrentIndex(prev => (prev + 1) % CARDS.length);
      }
    }

    // fin rotation
    if (rotation.current >= Math.PI) {
      rotation.current = 0;
      halfDone.current = false;

      // arrêter si carte finale atteinte
      if (CARDS[currentIndex].id === targetCardId) {
        finished.current = true;
      }
    }
  });

  const currentTexture =
    rotation.current < Math.PI / 2 ? frontTextures[currentIndex] : backTexture;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={currentTexture} side={THREE.DoubleSide} />
    </mesh>
  );
}
