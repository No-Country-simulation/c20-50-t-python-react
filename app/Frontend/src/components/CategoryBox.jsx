// Importamos la biblioteca PropTypes para validar los tipos de props
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useCategory from "../store/useCategory";

/**
 * Componente CategoryBox
 *
 * Muestra una caja con un texto que representa una categoría
 *
 * @param {string} category - La categoría a mostrar
 * @returns {JSX.Element} El componente CategoryBox
 */
const CategoryBox = ({ label, onClick }) => {
  const { category } = useCategory();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    category === label ? setSelected(true) : setSelected(false);
  }, [category, selected, label]);

  return (
    // Contenedor con estilos de caja
    <button
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
        cursor-pointer

          text-sm
          md:text-base
          xl:text-lg
          font-semibold 
          leading-4
          capitalize

        ${selected ? "bg-black text-white" : null}
      `}
      onClick={onClick}
      value={label}
    >
      {label}
    </button>
  );
};

// Definimos los tipos de props esperados
CategoryBox.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Exportamos el componente por defecto
export default CategoryBox;
