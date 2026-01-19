// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/main.scss';
import { CardContextProvider } from "./context/CardContext";
import { FruitProvider } from "./context/FruitContext";
import CardScene from "./cardScenes/CardScene";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FruitProvider>
      <CardContextProvider>
        <CardScene />
      </CardContextProvider>
    </FruitProvider>
  </React.StrictMode>
);
