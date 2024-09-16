import React, { useState, useEffect } from "react"; // Agregada la importación de useEffect
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ManageComponent = () => {
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <div className="flex flex-col h-full">
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => navigate("pedidos")}
              className="text-white p-2 rounded"
            >
              Pedidos
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("manage")}
              className="text-white p-2 rounded"
            >
              Administración
            </button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ManageComponent;
