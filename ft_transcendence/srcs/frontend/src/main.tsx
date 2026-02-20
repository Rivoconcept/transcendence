// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
import { CardContextProvider } from "./cardGamecontext/CardContext";
// import { FruitProvider } from "./context/FruitContext";
import { CardGameContextProvider } from "./cardGamecontext/CardGameContext";
// import Fruit from "./Fruit";
import CardScene from "./cardScenes/CardScene";

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
  </React.StrictMode>
);
