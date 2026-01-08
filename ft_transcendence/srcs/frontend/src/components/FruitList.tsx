export default function FruitList({fruitInfo, onHandleDelete})
{
    return (
        <li> {fruitInfo.name} <button onClick={() => onHandleDelete(fruitInfo.id)}> X </button></li>
    )
}