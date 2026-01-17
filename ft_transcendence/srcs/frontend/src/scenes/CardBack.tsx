import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function BackCard() {
  const texture = useLoader(TextureLoader, "/diamonds/back.png");

  return (
    <mesh>
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
