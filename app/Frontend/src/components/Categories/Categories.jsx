import PropTypes from "prop-types";
import CategoryBox from "../CategoryBox";

/**
 * Componente que renderiza una lista de categorías
 *
 * @param {array} categories - Arreglo de categorías a renderizar
 * @returns {JSX.Element} - Elemento JSX que contiene la lista de categorías
 */
const Categories = ({ categories }) => {
  return (
    // Contenedor principal con estilos de flexbox
    <div
      className={`
        flex 
        flex-row  
        mx-1 
        items-center 
        w-full 
        justify-evenly
        overflow-hidden
      `}
    >
      {/*
        Mapeamos el arreglo de categorías y renderizamos un CategoryBox por cada una
      */}
      {categories.map((item) => {
        return <CategoryBox key={item} label={item} />;
      })}
    </div>
  );
};

// Definimos los tipos de props esperados
Categories.propTypes = {
  // El prop 'categories' es un arreglo requerido
  categories: PropTypes.array.isRequired,
};

export default Categories;
