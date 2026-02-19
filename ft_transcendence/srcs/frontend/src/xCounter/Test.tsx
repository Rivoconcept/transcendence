import { useAtom } from "jotai";
import { Compteur } from "./Compteur";
import { compteurAtom } from "./utils/Atoms";


function Test() {
    // state (état, données internes au composant)
    const [count] = useAtom(compteurAtom);

    // comportements

    // affichage (render)
    return (
        <>
            <div>{count}</div>
            <Compteur />
        </>
    )

}

export default Test;