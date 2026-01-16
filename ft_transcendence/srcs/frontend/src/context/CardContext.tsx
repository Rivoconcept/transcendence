// /home/rivoinfo/Documents/DEV/transcendence/ft_transcendence/srcs/frontend/src/context/CardContext.tsx

import { createContext, useContext, useState } from "react";
import { proofByNine } from "../utils/proofByNine";
import type { CardContextType } from "../typescript/CardContextType";

const CardContext = createContext<CardContextType | null>(null);

export function CardContextProvider({ children }: { children: React.ReactNode }) {
  const [values, setValues] = useState<number[]>([]);

  const drawAll = () => {
    const drawn = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 13) + 1
    );
    setValues(drawn);
  };

  const sum = values.reduce((s, v) => s + v, 0);
  const score = values.length === 3 ? proofByNine(sum) : 0;

  return (
    <CardContext.Provider value={{ values, score, drawAll }}>
      {children}
    </CardContext.Provider>
  );
}

/* ---------------- SUCTOM HOOK ---------------- */

export function useCardGame() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCardGame must be used within CardContextProvider");
  return ctx;
}

