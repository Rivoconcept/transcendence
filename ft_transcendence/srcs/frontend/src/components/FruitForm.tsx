import { useState } from "react";

export default function FruitForm({ handleAdd })
{
       
    const [newFruit, setNewFruit] = useState("");


/**************************************************************** */
    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if (newFruit.trim() === "") return;

    //     // manipulation sur la copie du state
    //     // const id = new Date().getTime();
    //     const id = maxId();
    //     // alert(id);
    //     const name = newFruit;
    //     const FruitToAdd = {id, name};
    //     handleAdd(FruitToAdd)
    //     // modifier le state avec le setter
    //     setNewFruit("");
    // }
/********************************************************************** */

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newFruit.trim() === "") return;

        handleAdd(newFruit);
        setNewFruit("");
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