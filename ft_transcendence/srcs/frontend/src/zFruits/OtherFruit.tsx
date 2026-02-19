import { useState } from "react";
import FruitList from "./otherFruitList"
import FruitForm from "./otherFruitForm";

function OtherFruit() {

    const [fruit, setFruit] = useState([
        {id: 1, name: "Apple"},
        {id: 2, name: "Banana"},
        {id: 3, name: "Cherry"},
        {id: 4, name: "Date"},
        {id: 5, name: "Elderberry"},
    ]);

    const handleAdd = (fruitToAdd) => {
        // Copie du state
        // setFruit([...fruit, { id: Date.now(), name: newFruit }]);
        const copyFruit = [...fruit]
        copyFruit.push(fruitToAdd);
        setFruit(copyFruit);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

    // const handleAdd = (name) => {
    //     setFruit([...fruit, { id: nextId.current++, name }]);
    // };
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleDelete = (id) => {

        const FruitCopy = [...fruit]
        const newDelete = FruitCopy.filter(item => item.id !== id)

        setFruit(newDelete)
    }

    return(
        <>
            <h1>Liste des Fruits</h1>
            <ul>
                {fruit.map((fruit) =>(
                    // <li key={fruit.id}>{fruit.name} <button onClick={() => handleDelete(fruit.id)}>X</button></li>
                    <FruitList key={fruit.id} fruitInfo={fruit} onClick={() => handleDelete(fruit.id)} />
                ))}
            </ul>
            <FruitForm fruits={fruit} handleAdd={handleAdd}/>
        </>
    );
}

export default OtherFruit;