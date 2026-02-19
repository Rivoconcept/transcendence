// src/main.tsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
// import { FruitProvider } from "./context/FruitContext";
// import Fruit from "./Fruit";
import CardScene from "./cardScenes/CardScene";
import { CardContextProvider } from "./cardGamecontext/CardContext";
import { CardGameContextProvider } from "./cardGamecontext/CardGameContext";
// import CoursWs from "./CoursWs";
// import Test from "./Test";
// import DoubleCompteur from "./DoubleCompteur";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <FruitProvider> */}
      <CardContextProvider>
        <CardGameContextProvider>
          <CardScene />
        </CardGameContextProvider>
      </CardContextProvider>
      {/* <Fruit /> */}
      
    {/* </FruitProvider> */}
    {/* <CoursWs/>
    <Test />
    <Suspense fallback={<p>Chargement utilisateur…</p>}>
      <DoubleCompteur />
    </Suspense> */}

  </React.StrictMode>
);
