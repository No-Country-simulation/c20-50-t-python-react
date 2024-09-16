import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // quitar BrowserRouter
import ToasterProvider from "./providers/ToasterProvider.jsx";

import App from "./App.jsx";
import ErrorPage from "./Error-page.jsx";
import OrderModal from "./components/modals/OrderModal.jsx";

import Registro from "./views/RegistroComponent.jsx";
import Login from "./views/Login.jsx";
import ManageComponent from "./views/ManageComponent.jsx";
import AgendaPedidos from "./views/AgendaPedidos.jsx";
import "./index.css";
import ManagePanel from "./views/ManagePanel.jsx";
import WaitressModal from "./components/modals/WaitressModal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/panel",
    element: <ManageComponent />,
    children: [
      {
        path: "pedidos",
        element: <AgendaPedidos />,
      },
      {
        path: "manage",
        element: <ManagePanel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToasterProvider />
    <WaitressModal />
    <OrderModal />
    <RouterProvider router={router} />
  </StrictMode>
);
