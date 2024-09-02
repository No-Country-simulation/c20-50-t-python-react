import Cards from "../components/cards/Cards";

const CardsContainer = () => {
  return (
    <div className="flex flex-col w-3/5">
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

      <Cards />
    </div>
  );
};

export default CardsContainer;
