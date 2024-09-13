import PropTypes from "prop-types";

const AgregadoBtn = ({ agregado }) => {
  return (
    <div
      key={agregado.id}
      id={agregado.id}
      className="flex md:justify-start gap-2 h-full"
    >
      <div className="flex flex-row w-full items-center">
        <div className="w-6 xl:w-9 h-9 xl:h-12  flex justify-start items-center">
          <input
            type="radio"
            id={`${agregado.id}`}
            name="agregado"
            value={agregado.id}
            className="w-4 xl:w-5 h-4 xl:h-5  "
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <span className="capitalize text-lg md:text-base ">
            {agregado?.name}
          </span>
          <span className="text-lg md:text-base font-medium">
            ${agregado.price}
          </span>
        </div>
      </div>
    </div>
  );
};

AgregadoBtn.propTypes = {
  agregado: PropTypes.object.isRequired,
};

export default AgregadoBtn;
