// Componente Header
const Header = () => {
  // Retorna el JSX del componente
  return (
    // Div contenedor del header
    <div
      className={`
        flex
        bg-gray-900
        h-[20%]
        w-full
        justify-center
        items-center 
        py-2
      `}
    >
      {/* Div contenedor de Logo y la dirección */}

      {/* Logo */}

      <img
        src="https://i.ibb.co/gj4hVP3/logobanner1-1.png"
        alt="Banner"
        className="w-[15%] h-auto rounded-md overflow-hidden"
      />
    </div>
  );
};

export default Header;
