import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ToasterProvider from "./providers/ToasterProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToasterProvider />
    <App />
  </StrictMode>
);
