// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import './styles/main.scss'
import { FruitProvider } from "./context/FruitContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FruitProvider>
        <App />
    </FruitProvider>
  </React.StrictMode>
)
