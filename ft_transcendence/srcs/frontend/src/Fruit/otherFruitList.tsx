export default function FruitList({fruitInfo, onClick})
{
    return (
        <li onClick={onClick}> {fruitInfo.name} <button> X </button></li>
    )
}