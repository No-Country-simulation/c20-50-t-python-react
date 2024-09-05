import PropTypes from "prop-types";

const Card = ({ id, title, price, description, category, agregados }) => {
  return (
    <div
      className={`
    shadow-md
    rounded-[15px]
    overflow-hidden
    `}
      id={id}
      name={category}
    >
      <img
        src="https://i.pinimg.com/564x/07/21/32/072132759e23ee009f4f9ba04bdc8845.jpg"
        className={`
          w-full 
          h-[150px]
         `}
      />
      <div
        className={`
        flex
        flex-col
        gap-2
        px-3
        py-2
        lg:h-[142px]
       justify-evenly
        `}
      >
        <h2
          className={`
        sm:text-sm
        lg:text-lg
        2xl:text-xl
        font-semibold
        line-clamp-1
        text-ellipsis
        overflow-clip
        `}
        >
          {title}
        </h2>
        <div className="overflow-clip text-ellipsis line-clamp-2">
          {description}
        </div>
        <div className="rounded-lg bg-[#C0C0C0] p-1 w-[78px] text-center font-semibold">
          {price} $
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  agregados: PropTypes.array.isRequired,
};

export default Card;
