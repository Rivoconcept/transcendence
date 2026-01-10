// src/components/cards/Card3D.tsx
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { CARDS } from "../../utils/cards";

type Props = {
  targetCardId?: string;  // peut être undefined au départ
  shuffleSpeed?: number;
};

export default function Card3D({
  targetCardId,
  shuffleSpeed = 0.15,
}: Props) {
  const mesh = useRef<THREE.Mesh>(null!);

  const frontTextures = useMemo(() => {
    return CARDS.map(c => {
      const tex = useLoader(TextureLoader, c.texture);
      tex.flipY = false; // 👈 CORRECTION
      return tex;
    });
  }, []);

  const backTexture = useLoader(TextureLoader, "/diamonds/back.png");
  backTexture.flipY = false; // 👈 CORRECTION


  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const shuffling = useRef(true);
  const shuffleTimer = useRef<number | null>(null);

  const rotation = useRef(0);
  const finished = useRef(false);

  // ---------------- PHASE SHUFFLE ----------------
  useEffect(() => {
    shuffling.current = true;
    finished.current = false;
    rotation.current = 0;
    setCurrentIndex(0);
    setShowBack(false);

    shuffleTimer.current = window.setInterval(() => {
      setShowBack(prev => {
        if (prev) {
          setCurrentIndex(i => (i + 1) % CARDS.length);
        }
        return !prev;
      });
    }, 80);

    return () => {
      if (shuffleTimer.current) clearInterval(shuffleTimer.current);
    };
  }, []);

  // ---------------- REVEAL FINAL ----------------
  useEffect(() => {
    if (!targetCardId) return;

    if (shuffleTimer.current) clearInterval(shuffleTimer.current);

    const index = CARDS.findIndex(c => c.id === targetCardId);
    if (index !== -1) setCurrentIndex(index);

    setShowBack(false);
    shuffling.current = false;
  }, [targetCardId]);

  // ---------------- ROTATION FINALE ----------------
  useFrame(() => {
    if (shuffling.current || finished.current || !mesh.current) return;

    rotation.current += shuffleSpeed;
    mesh.current.rotation.y = rotation.current;

    if (rotation.current >= Math.PI) {
      rotation.current = 0;
      finished.current = true;
    }
  });

  const currentTexture = showBack ? backTexture : frontTextures[currentIndex];


return (
  <mesh ref={mesh}>
    <planeGeometry args={[2.5, 3.5]} />
    <meshStandardMaterial
      map={currentTexture}
      side={THREE.DoubleSide} // pour pouvoir voir le front/back sans flip
    />
  </mesh>
);



}
