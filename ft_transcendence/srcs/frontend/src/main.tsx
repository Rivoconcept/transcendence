// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
import { CardContextProvider } from "./context/cardGame/CardContext";
import { FruitProvider } from "./context/FruitContext";
import CardScene from "./cardScenes/CardScene";
import Fruit from "./Fruit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <FruitProvider> */}
      <CardContextProvider>
        <CardScene />
      </CardContextProvider>
      {/* <Fruit /> */}
      
    {/* </FruitProvider> */}
  </React.StrictMode>
);
