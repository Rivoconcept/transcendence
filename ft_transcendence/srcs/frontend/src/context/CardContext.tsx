// src/context/CardContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type CardContextType = {
  finalCardId: string | null;
  setFinalCardId: (id: string) => void;
  shuffling: boolean;
  setShuffling: (b: boolean) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [finalCardId, setFinalCardId] = useState<string | null>(null);
  const [shuffling, setShuffling] = useState(false);

  return (
    <CardContext.Provider
      value={{ finalCardId, setFinalCardId, shuffling, setShuffling }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used within CardProvider");
  return context;
};
