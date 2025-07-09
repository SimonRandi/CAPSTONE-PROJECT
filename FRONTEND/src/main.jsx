import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnimalProvider } from "./components/context/AnimalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnimalProvider>
      <App />
    </AnimalProvider>
  </StrictMode>
);
