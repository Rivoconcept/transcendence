// src/components/cards/Card3D.tsx

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { CARDS } from "../../utils/cards";

type Props = {
  targetCardId: string;
  shuffleSpeed?: number;
};

export default function Card3D({
  targetCardId,
  shuffleSpeed = 0.15,
}: Props) {
  const mesh = useRef<THREE.Mesh>(null!);

  // textures
  const frontTextures = useMemo(
    () => CARDS.map(c => useLoader(TextureLoader, c.texture)),
    []
  );
  const backTexture = useLoader(TextureLoader, "./diamonds/back.png");

  // shuffle state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  // refs (no rerender)
  const shuffling = useRef(true);
  const shuffleTimer = useRef<number | null>(null);

  // rotation finale
  const rotation = useRef(0);
  const finished = useRef(false);

  /* ---------------------------
     PHASE 1 — SHUFFLE RAPIDE
  ---------------------------- */
  useEffect(() => {
    shuffling.current = true;
    finished.current = false;
    rotation.current = 0;

    setCurrentIndex(0);
    setShowBack(false);

    shuffleTimer.current = window.setInterval(() => {
      setShowBack(prev => {
        // quand on repasse sur la face → carte suivante
        if (prev === true) {
          setCurrentIndex(i => (i + 1) % CARDS.length);
        }
        return !prev;
      });
    }, 80); // vitesse du shuffle

    return () => {
      if (shuffleTimer.current) {
        clearInterval(shuffleTimer.current);
      }
    };
  }, []);

  /* ---------------------------
     PHASE 2 — ARRÊT SHUFFLE
     + PRÉPARATION REVEAL
  ---------------------------- */
  useEffect(() => {
    if (!targetCardId) return;

    if (shuffleTimer.current) {
      clearInterval(shuffleTimer.current);
    }

    const index = CARDS.findIndex(c => c.id === targetCardId);
    if (index !== -1) {
      setCurrentIndex(index);
    }

    setShowBack(false);
    shuffling.current = false;
  }, [targetCardId]);

  /* ---------------------------
     PHASE 3 — ROTATION FINALE
  ---------------------------- */
  useFrame(() => {
    if (shuffling.current || finished.current || !mesh.current) return;

    rotation.current += shuffleSpeed;
    mesh.current.rotation.y = rotation.current;

    if (rotation.current >= Math.PI) {
      rotation.current = 0;
      finished.current = true;
    }
  });

  /* ---------------------------
     TEXTURE ACTIVE
  ---------------------------- */
  const currentTexture = showBack
    ? backTexture
    : frontTextures[currentIndex];

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial
        map={currentTexture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
