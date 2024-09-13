import Button from "../components/Button";
import Order from "../components/Order";
import useCart from "../store/useCart";
import PropTypes from "prop-types";

const OrderSummary = () => {
  const { orders, total, subTotal } = useCart();

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

      {orders.length === 0 ? (
        <div className=" px-4  ">
          <div
            className={`
          flex
          items-center
          justify-center
          self-center

          w-1/2
          h-[46px]
          mx-auto
          text-white
          font-semibold
          text-lg 
          border
          rounded-xl
          border-[#343434]
          bg-[#343434]
          `}
          >
            No orders yet
          </div>
        </div>
      ) : (
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
      )}

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
          <span>$ {subTotal}</span>
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
          <span>$ {total}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div
          className={`
        w-full 
        px-2
        mx-auto
      `}
        >
          <Button disabled label="Confirmar pedido" />
        </div>
      ) : (
        <div
          className={`
        w-full 
        px-2
        mx-auto
      `}
        >
          <Button label="Confirmar pedido" />
        </div>
      )}
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.array,
};

export default OrderSummary;
