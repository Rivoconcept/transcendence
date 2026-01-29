// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
import { CardContextProvider } from "./context/cardGame/CardContext";
// import { FruitProvider } from "./context/FruitContext";
import { CardGameContextProvider } from "./context/cardGame/CardGameContext";
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
