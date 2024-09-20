import { useEffect, useState } from "react";
import Button from "../components/Button";
import Order from "../components/Order";
import useCart from "../store/useCart";
import PropTypes from "prop-types";
import useWaitressModal from "../hooks/useWaitressModal";
import useMesaStore from "../hooks/useMesaStore";

const OrderSummary = () => {
  const { orders } = useCart();
  const table = useMesaStore();
  const waitressModal = useWaitressModal();
  let [subTotal, setSubTotal] = useState(
    orders.length === 0
      ? 0
      : orders.reduce((acc, order) => acc + order.totalPrice, 0)
  );
  let [total, setTotal] = useState(subTotal + subTotal * 0.03);

  useEffect(() => {
    if (orders.length === 0) {
      setSubTotal(0), setTotal(0);
    } else {
      setSubTotal(orders.reduce((acc, order) => acc + order.totalPrice, 0));
      setTotal(subTotal + subTotal * 0.03);
    }

    table.numeroMesa ? null : table.numeroMesa;
  }, [orders, subTotal, table]);

  const handleClick = () => {
    waitressModal.onOpen();
  };

  return (
    <div className="hidden lg:flex flex-col w-[32.4%] justify-start items-start  ">
      {table.numeroMesa ? (
        <div className="flex-row flex h-[48px] items-center justify-start gap-6">
          <div className="font-medium bg-[#CFCFCF] rounded-lg py-2 px-[14px] h-[48px] flex items-center w-fit">
            N° de mesa
            <span className="text-2xl font-black ml-2">{table.numeroMesa}</span>
          </div>

          <button
            className="hover:animate-blink px-2"
            onClick={() => handleClick()}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="36" height="36" fill="url(#pattern0_172_1436)" />
              <defs>
                <pattern
                  id="pattern0_172_1436"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_172_1436" transform="scale(0.01)" />
                </pattern>
                <image
                  id="image0_172_1436"
                  width="100"
                  height="100"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </button>
        </div>
      ) : null}

      <div
        className={`
      flex 
      flex-col 
      w-full
      h-fit
      bg-[#CFCFCF] 
      mr-1 
      rounded-[15px] 
      py-3 
      my-4
    `}
      >
        <div
          className={`
        w-[95%] 
        flex 
        justify-center
        mx-auto
        pb-2 
        mb-4
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
          text-center
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
          my-2
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
        pr-2 
        pl-2 
        gap-3
        `}
          >
            {orders.map((food, key) => {
              return <Order key={key} food={food} />;
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
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.array,
};

export default OrderSummary;
