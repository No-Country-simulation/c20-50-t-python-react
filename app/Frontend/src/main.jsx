// import PropTypes from "prop-types";

// Importaciones de React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importaciones de componentes
import App from "./App.jsx";
import ErrorPage from "./Error-page.jsx";
import AgendaPedidos from "./components/AgendaPedidos.jsx"

// Importaciones de estilos
import "./index.css";

// Importaciones de proveedores
import ToasterProvider from "./providers/ToasterProvider.jsx";

// Importaciones de react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Creación del router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocina",
    element: <AgendaPedidos/>
  },
]);

// Renderiza la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToasterProvider />
    <RouterProvider router={router} />
  </StrictMode>
);
