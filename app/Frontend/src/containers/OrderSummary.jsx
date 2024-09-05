import Button from "../components/Button";
import Order from "../components/Order";

import PropTypes from "prop-types";

const OrderSummary = () => {
  const orders = [
    {
      title: "Fettuccine Alfredo",
      price: 16,
      description: "Fettuccine, crema, parmesano, mantequilla",
      id: 8,
      category: "Pastas",
      agregados: [
        {
          id: 3,
          id_menu: 8,
          name: "Pollo a la Parrilla",
          price: 3.0,
          description:
            "Un poco de pollo a la parrilla para darle un toque más proteico",
        },
        {
          id: 4,
          id_menu: 8,
          name: "Cebolla Caramelizada",
          price: 1.5,
          description:
            "Un poco de cebolla caramelizada para darle un toque más dulce",
        },
      ],
    },
    {
      id: 9,
      title: "Risoto de Champiñones",
      price: 18.99,
      description: "Arroz, champiñones, cebolla, vino blanco, caldo de pollo",
      category: "Risotos",
      agregados: [
        {
          id: 12,
          id_menu: 9,
          name: "Queso de Cabra",
          price: 2.75,
          description: "Un queso de cabra para darle un toque más exótico",
        },
        {
          id: 13,
          id_menu: 9,
          name: "Perejil Fresco",
          price: 1.0,
          description:
            "Un poco de perejil fresco para darle un toque más fresco",
        },
      ],
    },
  ];

  return (
    <div
      className={`
      flex 
      flex-col 
      w-[32.4%] 
      h-fit
      bg-[#E6E6E6] 
      mr-1 
      rounded-[15px] 
      py-3 
    `}
    >
      <div
        className={`
        w-full 
        px-3 
        pb-2 
        mb-2 
        border-b 
        border-[#00000080]
      `}
      >
        <span
          className={`
          text-sm
          md:text-base
          lg:text-lg
          xl:text-xl
          font-semibold
        `}
        >
          Mi pedido
        </span>
      </div>
      <div
        className={`
        flex
        flex-col
        pr-4 
        pl-2 
        gap-3
        `}
      >
        {orders.map((food, key) => {
          return (
            <Order
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
      <div
        name="bills"
        className={`
        flex 
        flex-col 
        pl-3 
        pr-2 
        my-3
      `}
      >
        <div
          className={`
          flex 
          flex-row 
          font-medium 
          justify-between
          sm:text-xs
          md:text-sm
          lg:text-base
          xl:text-lg
        `}
        >
          <span>Sub-total</span>
          <span>$10.00</span>
        </div>
        <div
          className={`
          flex 
          flex-row 
          justify-between
        
          text-sm
          md:text-base
          lg:text-lg
          xl:text-xl
          font-semibold
        `}
        >
          <span>Total</span>
          <span>$10.00</span>
        </div>
      </div>

      <div
        className={`
        w-full 
        px-2
        mx-auto
      `}
      >
        <Button label="Confirmar pedido" />
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.array,
};

export default OrderSummary;
