import { useAtom } from "jotai"
import { compteurAtom } from "./utils/Atoms"


export const Compteur = () => {
    const [_, setCount] = useAtom(compteurAtom)

    return (
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    )
}