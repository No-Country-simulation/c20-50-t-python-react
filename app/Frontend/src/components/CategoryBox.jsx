// Importamos la biblioteca PropTypes para validar los tipos de props
import PropTypes from "prop-types";

/**
 * Componente CategoryBox
 *
 * Muestra una caja con un texto que representa una categoría
 *
 * @param {string} category - La categoría a mostrar
 * @returns {JSX.Element} El componente CategoryBox
 */
const CategoryBox = ({ label }) => {
  return (
    // Contenedor con estilos de caja
    <div
      className={`
        box-border 
        flex-1 
        text-center 
        py-3 
        transition 
        hover:bg-black 
        text-[#4A4A4A] 
        hover:text-white 
        rounded-[10px]
      `}
    >
      {/* Texto de la categoría con estilos de fuente */}
      <span
        className={`
          text-sm
          md:text-base
          xl:text-lg
          font-semibold 
          leading-4
          capitalize
        `}
      >
        {label}
      </span>
    </div>
  );
};

// Definimos los tipos de props esperados
CategoryBox.propTypes = {
  label: PropTypes.string.isRequired,
};

// Exportamos el componente por defecto
export default CategoryBox;
