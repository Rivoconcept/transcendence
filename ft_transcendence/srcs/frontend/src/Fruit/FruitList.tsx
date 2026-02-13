import { useFruit } from "./FruitContext";

export default function FruitList() {
    const { fruits, deleteFruit } = useFruit();

    return (
        <ul>
            {fruits.map(fruit => (
                <li key={fruit.id}>
                    {fruit.name}
                    <button onClick={() => deleteFruit(fruit.id)}>X</button>
                </li>
            ))}
        </ul>
    );
}
