/**
 * Componente principal de la aplicación
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la estructura básica de la aplicación
 */

import { useEffect } from "react";
import Header from "./containers/Header";
import Navbar from "./containers/Navbar";
import OrderSummary from "./containers/OrderSummary";
import useMenu from "./store/useMenu";
import MenuLoader from "./containers/MenuLoader";

// Definimos las categorías de la aplicación
const categories = [
  "Entradas",
  "Pizza",
  "Bebidas",
  "Pastas",
  "Rissotto",
  "Postres",
];

const App = () => {
  return (
    // Contenedor principal con estilos de flexbox
    <div
      className={`
        flex 
        flex-col 
        h-screen 
        font-roboto
        md:scrollbar
        md:overflow-y-scroll
        md:scrollbar-track-rounded-full
        md:scrollbar-thumb-rounded-full
        md:scrollbar-thumb-gray-500 
        md:scrollbar-track-slate-300 
        `}
    >
      {/* Header de la aplicación */}
      <Header />
      {/* Barra de navegación con categorías */}
      <Navbar categories={categories} />
      {/* Contenedor vacío para futuras secciones */}
      <div
        className={`
          flex 
          flex-row
          justify-between
          w-[87.5%]
          mx-auto
          mt-4
        `}
      >
        <MenuLoader />
        <OrderSummary />
      </div>
    </div>
  );
};

export default App;
