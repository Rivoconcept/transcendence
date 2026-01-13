import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { CARDS } from "../../utils/cards";

export default function RevealCard({ cardId }: { cardId: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { scene } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(2.5, 3.5);
    const uv = g.attributes.uv.array as Float32Array;
    uv[0] = 1; uv[2] = 0;
    uv[4] = 1; uv[6] = 0;
    g.attributes.uv.needsUpdate = true;
    return g;
  }, []);

  const fronts = CARDS.map(c =>
    useLoader(TextureLoader, c.texture)
  );
  const back = useLoader(TextureLoader, "/diamonds/back.png");

  const [showBack, setShowBack] = useState(true);
  const [index, setIndex] = useState(0);
  const flipped = useRef(false);
  
  const [loaded, setLoaded] = useState(false);

  // Attendre que les textures soient chargées
  useEffect(() => {
    if (fronts.length > 0 && back && !loaded) {
      setLoaded(true);
    }
  }, [fronts, back, loaded]);

  // Mettre le fond noir une fois chargé
  useEffect(() => {
    if (loaded) {
      scene.background = new THREE.Color(0x000000);
    }
  }, [loaded, scene]);

  useEffect(() => {
    const i = CARDS.findIndex(c => c.id === cardId);
    if (i !== -1) setIndex(i);
    mesh.current.rotation.y = 0;
    setShowBack(true);
    flipped.current = false;
  }, [cardId]);

  useFrame(() => {
    if (mesh.current.rotation.y >= Math.PI) return;

    mesh.current.rotation.y += 0.12;

    if (!flipped.current && mesh.current.rotation.y >= Math.PI / 2) {
      setShowBack(false);
      flipped.current = true;
    }
  });

  return (
    <group ref={mesh}>
      {/* Fond noir derrière la carte */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial color={0x000000} />
      </mesh>
  
      {/* La carte qui tourne */}
      <mesh>
        <primitive object={geometry} />
        <meshStandardMaterial
          map={showBack ? back : fronts[index]}
          side={THREE.DoubleSide}
          transparent={true} // garde les zones transparentes
        />
      </mesh>
    </group>
  );
  
}