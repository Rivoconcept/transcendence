import { useState } from "react";
import FruitList from "./components/FruitList"
import FruitForm from "./components/FruitForm";

function Fruit() {

    const [fruit, setFruit] = useState([
        {id: 1, name: "Apple"},
        {id: 2, name: "Banana"},
        {id: 3, name: "Cherry"},
        {id: 4, name: "Date"},
        {id: 5, name: "Elderberry"},
    ]);

/********************************************************************** */
    // const handleAdd = (fruitToAdd) => {
    //     // Copie du state
    //     // setFruit([...fruit, { id: Date.now(), name: newFruit }]);
    //     const copyFruit = [...fruit]
    //     copyFruit.push(fruitToAdd);
    //     setFruit(copyFruit);
    // }

    // const maxId = () => {
    //     return fruit.length > 0
    //         ? fruit.reduce((max, f) => f.id > max ? f.id : max, 0) + 1
    //         : 1;
    // };
    
/****************************************************************** */

    // const handleAdd = (name) => {
    //     const newId =
    //         fruit.length > 0
    //             ? fruit[fruit.length - 1].id + 1
    //             : 1;

    //     setFruit([
    //         ...fruit,
    //         { id: newId, name }
    //     ]);
    // };
/******************************************************************* */
    // const nextId = useRef(6);

    // const handleAdd = (name) => {
    //     setFruit([...fruit, { id: nextId.current++, name }]);
    // };

/**************************************************************** */
    const handleAdd = (name) => {
        const maxId = fruit.reduce(
            (max, item) => item.id > max ? item.id : max,
            0
        );

        setFruit([
            ...fruit,
            { id: maxId + 1, name }
        ]);
        alert(id);
    };



    const handleDelete = (id) => {

        const FruitCopy = [...fruit]
        const newDelete = FruitCopy.filter(item => item.id !== id)

        setFruit(newDelete)
    }


    return(
        <div>
            <h1>Liste des Fruits</h1>
            <ul>
                {fruit.map((fruit) =>(
                    // <li key={fruit.id}>{fruit.name} <button onClick={() => handleDelete(fruit.id)}>X</button></li>
                    <FruitList key={fruit.id} fruitInfo={fruit} onHandleDelete={handleDelete} />
                ))}
            </ul>
            <FruitForm handleAdd={handleAdd}/>
        </div>
    );
}

export default Fruit;