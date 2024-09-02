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

const menu = [
  {
    title: "Bruschetta",
    price: 8,
    ingredients:
      "Una mezcla de Pan tostado con tomate fresco, albahaca, mozzarella y aceite de oliva que hace agua la boca",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 1,
    category: "Entrantes",
  },
  {
    title: "Ensalada César",
    price: 10,
    ingredients: "Lechuga romana, pollo, croutons, parmesano, salsa César",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 2,
    category: "Entrantes",
  },
  {
    title: "Margherita",
    price: 12,
    ingredients: "Salsa de tomate, mozzarella, albahaca fresca",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 3,
    category: "Pizzas",
  },
  {
    title: "Quattro Formaggi",
    price: 15,
    ingredients:
      "Salsa de tomate, cuatro tipos de queso (parmesano, mozzarella, gorgonzola, ricotta)",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 4,
    category: "Pizzas",
  },
  {
    title: "Coca-Cola",
    price: 3,
    ingredients: "Agua, azúcar, cafeína, extracto de cola",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 5,
    category: "Bebidas",
  },
  {
    title: "Vino Tinto",
    price: 5,
    ingredients: "Uva tinta, agua",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 6,
    category: "Bebidas",
  },
  {
    title: "Spaghetti Bolognese",
    price: 14,
    ingredients: "Spaghetti, carne de ternera, tomate, cebolla, ajo",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 7,
    category: "Pastas",
  },
  {
    title: "Fettuccine Alfredo",
    price: 16,
    ingredients: "Fettuccine, crema, parmesano, mantequilla",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 8,
    category: "Pastas",
  },
  {
    title: "Risoto de Champiñones",
    price: 18,
    ingredients: "Arroz, champiñones, cebolla, vino blanco, caldo de pollo",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 9,
    category: "Risotos",
  },
  {
    title: "Tiramisú",
    price: 7,
    ingredients: "Ladyfingers, mascarpone, café, azúcar",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 10,
    category: "Postres",
  },
  {
    title: "Panna Cotta",
    price: 8,
    ingredients: "Crema, azúcar, vainilla, frutas frescas",
    image:
      '<svg width="260" height="150" viewBox="0 0 260 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">...</svg>',
    id: 11,
    category: "Postres",
  },
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
