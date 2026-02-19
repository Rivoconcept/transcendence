import { createContext, useContext, useRef, useState } from "react";
import type { Fruit, FruitContextType } from "./FruitContextType";

/* =============== CONTEXT =============== */

const FruitContext = createContext<FruitContextType | undefined>(undefined);

/* =============== PROVIDER =============== */

export function FruitProvider({ children }: { children: React.ReactNode }) {
    const [fruits, setFruits] = useState<Fruit[]>([
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Cherry" },
    ]);

    const nextId = useRef<number>(4);

    const addFruit = (name: string) => {
        setFruits(prev => [...prev, { id: nextId.current++, name }]);
    };

    const deleteFruit = (id: number) => {
        setFruits(prev => prev.filter(f => f.id !== id));
    };

    return (
        <FruitContext.Provider value={{ fruits, addFruit, deleteFruit }}>
            {children}
        </FruitContext.Provider>
    );
}

/* =============== CUSTOM HOOK =============== */

export function useFruit() {
    const context = useContext(FruitContext);
    if (!context) {
        throw new Error("useFruit must be used within a FruitProvider");
    }
    return context;
}
