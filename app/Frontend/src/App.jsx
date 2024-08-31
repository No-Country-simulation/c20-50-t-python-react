import "./App.css";
import Header from "./containers/Header";
import Navbar from "./containers/Navbar";

const categories = [
  "Entrantes",
  "Pizzas",
  "Bebidas",
  "Pastas",
  "Risotos",
  "Postres",
];

export default function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Navbar categories={categories} />
      </div>
    </>
  );
}
