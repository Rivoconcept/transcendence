// CardScene.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Card3D from "../components/cards/Card3D";

export default function CardScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />

      <Card3D />

      <OrbitControls />
    </Canvas>
  );
}
