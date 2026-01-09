import { useState } from "react";
import { useFruit } from "../context/FruitContext";

export default function FruitForm() {
    const { addFruit } = useFruit();
    const [newFruit, setNewFruit] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newFruit.trim()) return;

        addFruit(newFruit);
        setNewFruit("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={newFruit}
                onChange={(e) => setNewFruit(e.target.value)}
                placeholder="Ajouter un fruit"
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}
