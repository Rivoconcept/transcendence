import useProgressCircleTexture from "../components/cards/ProgressCircleTexture";

function ProgressCircleTimer() {
  const texture = useProgressCircleTexture(512);

  return (
    <mesh position={[0, 0, 0.01]}> {/* légèrement devant */}
      <planeGeometry args={[1.2, 1.2]} /> {/* plus petit que la carte */}
      <meshBasicMaterial map={texture} wireframe />

    </mesh>
  );
}

export default ProgressCircleTimer;
