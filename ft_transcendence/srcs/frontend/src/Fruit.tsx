import FruitForm from "./components/FruitForm";
import FruitList from "./components/FruitList";

export default function Fruit() {
    return (
        <>
            <h1>Liste des Fruits</h1>
            <FruitList />
            <FruitForm />
        </>
    );
}
