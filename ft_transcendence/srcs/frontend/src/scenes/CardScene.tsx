// src/scenes/CardScene.tsx
// import { Canvas } from "@react-three/fiber";
// import { useCard } from "../context/CardContext";
// import ShuffleCard from "../components/cards/ShuffleCard";
// import FinalCard from "../components/cards/FinalCard";

// export default function CardScene() {
//   const { setFinalCardId, setShuffling } = useCard();

// const randomCard = () => {
//   setShuffling(true);            // démarre la première phase
//   const randomIndex = Math.floor(Math.random() * 13);
//   setTimeout(() => {
//     setFinalCardId(String(randomIndex + 1)); // arrête shuffle et révèle la carte
//   }, 2000); // durée du shuffle
// };


//   return (
//     <>
//       <button onClick={randomCard} style={{ marginBottom: 10 }}>🎲 Tirer une carte</button>
//       <Canvas camera={{ position: [0, 1.5, 5] }}>
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} />
//         <ShuffleCard />
//         <FinalCard />
//       </Canvas>
//     </>
//   );
// }

// src/scenes/CardScene.tsx

import { Canvas } from "@react-three/fiber";
import Card3D from "../components/cards/Card3D";
import { useState } from "react";
import { CARDS } from "../utils/cards";

export default function CardScene() {
  const [finalCardId, setFinalCardId] = useState<string | undefined>(undefined);

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * CARDS.length);
    setFinalCardId(CARDS[randomIndex].id);
  };

  return (
    <>
      <button
        onClick={randomCard}
        style={{
          padding: "10px 16px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      >
        🎲 Tirer une carte
      </button>

      <div style={{ width: "50vw", height: "50vh" }}>
        <Canvas camera={{ position: [0, 1.5, 5] }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Card3D targetCardId={finalCardId} />
        </Canvas>
      </div>
    </>
  );
}
