import Card from "../components/card/Card";
import PropTypes from "prop-types";

const CardsContainer = ({ menu, order }) => {
  return (
    <div className="flex flex-col w-[66.2%]">
      <div
        className={`
        h-12
        border-b 
        border-[#BBBBBB]
        rounded-[5px] 
        bg-[#E8E8E8] 
        text-lg 
        font-semibold
        px-3
        content-center
        `}
      >
        CATEGORY
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
        {menu.map((food, key) => {
          return (
            <Card
              key={key}
              id={food.id}
              title={food.title}
              price={food.price}
              description={food.description}
              category={food.category}
              agregados={food.agregados}
            />
          );
        })}
      </div>
    </div>
  );
};

CardsContainer.propTypes = {
  menu: PropTypes.array,
  order: PropTypes.array,
};

export default CardsContainer;
