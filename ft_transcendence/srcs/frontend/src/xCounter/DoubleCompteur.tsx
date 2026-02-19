import { useAtom } from "jotai"
import {  doubledCompteurAtom, usersAtom } from "./utils/Atoms"


export default function DoubleCompteur() {
    const [doubleCompteur] = useAtom(doubledCompteurAtom)
    const [user] = useAtom(usersAtom)


    return (
        <>
            <div>
                <h1>User info</h1>
                <p>Name: { user.name } </p>
                <p>Email: { user.email } </p>
            </div>
        
            <h1>
                {doubleCompteur}
            </h1>

        </>
    )
}