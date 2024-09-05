/**
 * Componente principal de la aplicación
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la estructura básica de la aplicación
 */

import { useState } from "react";
import CardsContainer from "./containers/CardsContainer";
import Header from "./containers/Header";
import Navbar from "./containers/Navbar";
import OrderSummary from "./containers/OrderSummary";

// Definimos las categorías de la aplicación
const categories = [
  "entrantes",
  "pizzas",
  "bebidas",
  "pastas",
  "risotos",
  "postres",
];

const dishes = [
  {
    id: 1,
    title: "Bruschetta",
    price: 8.25,
    description:
      "Una mezcla de Pan tostado con tomate fresco, albahaca, mozzarella y aceite de oliva que hace agua la boca",
    category: "Entrantes",
    agregados: [
      {
        id: 1,
        id_menu: 1,
        name: "Extra Aceite de Oliva",
        price: 0.5,
        description: "Un toque extra de aceite de oliva para darle más sabor",
      },
      {
        id: 2,
        id_menu: 1,
        name: "Tomate Fresco Adicional",
        price: 1.25,
        description: "Un tomate fresco adicional para darle más sabor",
      },
    ],
  },
  {
    id: 2,
    title: "Ensalada César",
    price: 10.99,
    description: "Lechuga romana, pollo, croutons, parmesano, salsa César",
    category: "Entrantes",
    agregados: [
      {
        id: 3,
        id_menu: 2,
        name: "Pollo Extra",
        price: 2.5,
        description: "Un poco más de pollo para darle más proteína",
      },
      {
        id: 4,
        id_menu: 2,
        name: "Croutons de Pan Integral",
        price: 1.0,
        description:
          "Croutons de pan integral para darle un toque más saludable",
      },
    ],
  },
  {
    id: 3,
    title: "Margherita",
    price: 12.49,
    description: "Salsa de tomate, mozzarella, albahaca fresca",
    category: "Pizzas",
    agregados: [
      {
        id: 5,
        id_menu: 3,
        name: "Extra Cheese",
        price: 1.5,
        description: "Extra mozzarella cheese.",
      },
      {
        id: 6,
        id_menu: 3,
        name: "Olives",
        price: 0.75,
        description: "Fresh olives.",
      },
      {
        id: 7,
        id_menu: 3,
        name: "Pepperoni",
        price: 2.0,
        description: "Un poco de pepperoni para darle un toque más picante",
      },
    ],
  },
  {
    id: 4,
    title: "Quattro Formaggi",
    price: 15.99,
    description:
      "Salsa de tomate, cuatro tipos de queso (parmesano, mozzarella, gorgonzola, ricotta)",
    category: "Pizzas",
    agregados: [
      {
        id: 8,
        id_menu: 4,
        name: "Queso de Cabra",
        price: 3.0,
        description: "Un queso de cabra para darle un toque más exótico",
      },
      {
        id: 9,
        id_menu: 4,
        name: "Miel de Abeja",
        price: 1.25,
        description: "Un poco de miel de abeja para darle un toque más dulce",
      },
    ],
  },
  {
    id: 5,
    title: "Coca-Cola",
    price: 3.5,
    description: "Agua, azúcar, cafeína, extracto de cola",
    category: "Bebidas",
    agregados: [
      {
        id: 10,
        id_menu: 5,
        name: "Hielo",
        price: 0.25,
        description: "Un poco de hielo para refrescar",
      },
    ],
  },
  {
    id: 6,
    title: "Vino Tinto",
    price: 5.99,
    description: "Uva tinta, agua",
    category: "Bebidas",
    agregados: [
      {
        id: 11,
        id_menu: 6,
        name: "Tapas de Queso",
        price: 2.0,
        description: "Unas tapas de queso para acompañar el vino",
      },
    ],
  },
  {
    title: "Spaghetti Bolognese",
    price: 14,
    description: "Spaghetti, carne de ternera, tomate, cebolla, ajo",

    id: 7,
    category: "Pastas",
    agregados: [
      {
        id: 1,
        id_menu: 7,
        name: "Extra Carne",
        price: 2.5,
        description: "Un poco más de carne para darle más sabor",
      },
      {
        id: 2,
        id_menu: 7,
        name: "Queso Parmesano",
        price: 1.25,
        description:
          "Un poco de queso parmesano para darle un toque más salado",
      },
    ],
  },
  {
    title: "Fettuccine Alfredo",
    price: 16,
    description: "Fettuccine, crema, parmesano, mantequilla",
    id: 8,
    category: "Pastas",
    agregados: [
      {
        id: 3,
        id_menu: 8,
        name: "Pollo a la Parrilla",
        price: 3.0,
        description:
          "Un poco de pollo a la parrilla para darle un toque más proteico",
      },
      {
        id: 4,
        id_menu: 8,
        name: "Cebolla Caramelizada",
        price: 1.5,
        description:
          "Un poco de cebolla caramelizada para darle un toque más dulce",
      },
    ],
  },
  {
    id: 9,
    title: "Risoto de Champiñones",
    price: 18.99,
    description: "Arroz, champiñones, cebolla, vino blanco, caldo de pollo",
    category: "Risotos",
    agregados: [
      {
        id: 12,
        id_menu: 9,
        name: "Queso de Cabra",
        price: 2.75,
        description: "Un queso de cabra para darle un toque más exótico",
      },
      {
        id: 13,
        id_menu: 9,
        name: "Perejil Fresco",
        price: 1.0,
        description: "Un poco de perejil fresco para darle un toque más fresco",
      },
    ],
  },
  {
    id: 10,
    title: "Tiramisú",
    price: 7.99,
    description: "Ladyfingers, mascarpone, café, azúcar",
    category: "Postres",
    agregados: [
      {
        id: 14,
        id_menu: 10,
        name: "Café Extra",
        price: 1.5,
        description: "Un poco más de café para darle un toque más intenso",
      },
      {
        id: 15,
        id_menu: 10,
        name: "Chocolate Espolvoreado",
        price: 1.25,
        description:
          "Un poco de chocolate espolvoreado para darle un toque más dulce",
      },
    ],
  },
  {
    id: 11,
    title: "Panna Cotta",
    price: 8.99,
    description: "Crema, azúcar, vainilla, frutas frescas",
    category: "Postres",
    agregados: [
      {
        id: 16,
        id_menu: 11,
        name: "Frutas Frescas Adicionales",
        price: 2.0,
        description:
          "Unas frutas frescas adicionales para darle un toque más fresco",
      },
      {
        id: 17,
        id_menu: 11,
        name: "Caramelo",
        price: 1.5,
        description: "Un poco de caramelo para darle un toque más dulce",
      },
    ],
  },
];

const App = () => {
  const [menu, setMenu] = useState(dishes);
  const [order, setOrder] = useState([]);
  const [category, setCategory] = useState("");

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
      <Navbar
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
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
        <CardsContainer order={order} menu={menu} />
        <OrderSummary order={order} />
      </div>
    </div>
  );
};

export default App;
