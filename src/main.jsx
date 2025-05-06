import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from './utils/ThemeContext'; // Importa ThemeProvider
import './stylesheets/App.css';

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ThemeProvider> {/* Envuelve tu aplicación con ThemeProvider */}
        <App />
      </ThemeProvider>
    </StrictMode>
);
