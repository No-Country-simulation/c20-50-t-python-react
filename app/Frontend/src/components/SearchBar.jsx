import { useState } from "react";
import useMenu from "../store/useMenu";

/**
 * Componente que renderiza una barra de búsqueda
 *
 * @returns {JSX.Element} - Elemento JSX que contiene la barra de búsqueda
 */
const SearchBar = () => {
  const { menu, setFilteredMenu } = useMenu();
  const [searchQuery, setSearchQuery] = useState(""); // Add a state for the search query

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state

    if (query === "") {
      setFilteredMenu(menu); // Reset the filtered menu state to the original menu array
    } else {
      const filtered = menu.filter((dish) =>
        dish.title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredMenu(filtered);
    }
  };

  return (
    // Contenedor principal con estilos de flexbox

    <div
      className={`
        flex 
        flex-row 
        h-9
        lg:h-12 
        w-[32.2%] 
        bg-white 
        rounded-full
        lg:rounded-xl 
        border 
        border-[#C2C2C2] 
        overflow-hidden
        items-center
      `}
    >
      {/* Icono de búsqueda */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_191_562)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.76 25.27L32.49 31L31 32.49L25.27 26.76C24.2 27.53 22.91 28 21.5 28C17.91 28 15 25.09 15 21.5C15 17.91 17.91 15 21.5 15C25.09 15 28 17.91 28 21.5C28 22.91 27.53 24.2 26.76 25.27ZM21.5 17C19.01 17 17 19.01 17 21.5C17 23.99 19.01 26 21.5 26C23.99 26 26 23.99 26 21.5C26 19.01 23.99 17 21.5 17Z"
            fill="#363A44"
          />
        </g>
        <defs>
          <clipPath id="clip0_191_562">
            <rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Input de búsqueda */}
      <input
        className={`
          outline-none 
          w-full
          `}
        type="text"
        placeholder="Buscar un producto"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
