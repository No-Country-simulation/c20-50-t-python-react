/**
 * Componente principal de la aplicación
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la estructura básica de la aplicación
 */

import CardsContainer from "./containers/CardsContainer";
import Header from "./containers/Header";
import Navbar from "./containers/Navbar";
import OrderSummary from "./containers/OrderSummary";

// Definimos las categorías de la aplicación
const categories = [
  "Entrantes",
  "Pizzas",
  "Bebidas",
  "Pastas",
  "Risotos",
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
        `}
      >
        <CardsContainer />
        <OrderSummary />
      </div>
    </div>
  );
};

export default App;
