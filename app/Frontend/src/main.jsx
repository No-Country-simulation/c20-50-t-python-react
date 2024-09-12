// import PropTypes from "prop-types";

// Importaciones de React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importaciones de componentes
import App from "./App.jsx";
import ErrorPage from "./Error-page.jsx";

// Importaciones de estilos
import "./index.css";

// Importaciones de proveedores
import ToasterProvider from "./providers/ToasterProvider.jsx";

// Importaciones de react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderModal from "./components/modals/OrderModal.jsx";

// Creación del router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

// Renderiza la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToasterProvider />
    <OrderModal />
    <RouterProvider router={router} />
  </StrictMode>
);
