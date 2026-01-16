// src/scenes/CardScene.tsx
import { Canvas } from "@react-three/fiber";
import ShuffleCard from "../components/cards/ShuffleCard";
import RevealCard from "../components/cards/RevealCard";

export default function CardScene({ cards, }: { cards: string[]; })
{
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px", height: "50vh", }} >
      {[0, 1, 2].map(i => ( <div key={i} style={{ width: "15vw", height: "100%" }}>
          <Canvas camera={{ position: [0, 1.5, 5] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} />

            {!cards[i] && <ShuffleCard />}
            {cards[i] && <RevealCard cardId={cards[i]} />}
          </Canvas>
        </div>
      ))}
    </div>
  );
}




