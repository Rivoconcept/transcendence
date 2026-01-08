import { useState } from "react";

function Test() {
    // state (état, données internes au composant)
    const [compteur, setCompteur] = useState(0);

    // comportements
    const handleClick = () => {
        setCompteur(compteur + 1);
    }

    // affichage (render)
    return (
        <>
            <div>{compteur}</div>
            <button onClick={handleClick}>Increment</button>
        </>
    )

}

export default Test;