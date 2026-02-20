import { useState } from "react";

export default function FruitForm({fruits, handleAdd })
{
       
    const [newFruit, setNewFruit] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        if (newFruit.trim() === "") return;

        const newId = fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1;
        const FruitToAdd = { id: newId, name: newFruit };
        handleAdd(FruitToAdd);
        setNewFruit("");
        alert(newId)
    };

    const handleChange = (event) => {
        setNewFruit(event.target.value);
    }

    return (
        <form action="submit" onSubmit={handleSubmit}>
        <input value={newFruit} type="text" placeholder="Ajouter un fruit ..." onChange={handleChange}/>
        <button>Ajouter +</button>
    </form>
    );
}