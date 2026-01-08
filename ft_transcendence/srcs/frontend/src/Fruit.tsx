import { useState } from "react";

function Fruit() {

    const [fruit, setFruit] = useState([
        {id: 1, name: "Apple"},
        {id: 2, name: "Banana"},
        {id: 3, name: "Cherry"},
        {id: 4, name: "Date"},
        {id: 5, name: "Elderberry"},
    ]);

    
    const [newFruit, setNewFruit] = useState("");



    const handleSubmit = (event) => {
        event.preventDefault();
        // Copie du state
        const newFruit = [...fruit]


        // manipulation sur la copie du state
        const id = new Date().getTime();
        const nom = "newFruit";
        newFruit.push({id, nom});

        // modifier le state avec le setter
        setFruit(newFruit);
        setNewFruit("");
    }

    const handleChange = (event) => {
        const valueAfterChange = event.target.value;
        setNewFruit(valueAfterChange);
    }

    const handleDelete = (id) => {

        const FruitCopy = [...fruit]
        const newDelete = FruitCopy.filter(item => item.id !== id)

        setFruit(newDelete)
    }


    return(
        <div>
            <h1>Liste des Fruits</h1>
            <ul>
                {fruit.map((fruit) =>(<li key={fruit.id}>{fruit.name} <button onClick={() => handleDelete(fruit.id)}>X</button></li>))}
            </ul>
            <form action="submit" onClick = {handleSubmit}>
                <input value={newFruit} type="text" placeholder="Ajouter un fruit ..." onChange={handleChange}/>
                <button>Ajouter +</button>
            </form>
        </div>
    );
}

export default Fruit;