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
import ManagePanel from "./views/ManagePanel.jsx";
import MesaPage from "./views/MesaPage.jsx";
import "./index.css";

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
    path: "/mesa/:numeroMesa",
    element: <MesaPage />,
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
],
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToasterProvider />
    <OrderModal />
    <RouterProvider router={router} />
  </StrictMode>
);
