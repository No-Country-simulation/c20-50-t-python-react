import { useCallback, useEffect, useState } from "react";
import useCart from "../../store/useCart";
import useMesaStore from "../../hooks/useMesaStore";
import Order from "../Order";
import Button from "../Button";

const CartModal = () => {
  const cartModal = useCart();
  const { orders } = cartModal;
  const table = useMesaStore();
  const [showModal, setShowModal] = useState(cartModal.isOpen);
  let [subTotal, setSubTotal] = useState(
    orders.length === 0
      ? 0
      : orders.reduce((acc, order) => acc + order.totalPrice, 0)
  );
  let [total, setTotal] = useState(subTotal + subTotal * 0.03);

  console.log(showModal);

  useEffect(() => {
    setShowModal(cartModal.isOpen);
  }, [cartModal.isOpen]);

  useEffect(() => {
    if (orders.length === 0) {
      setSubTotal(0), setTotal(0);
    } else {
      setSubTotal(orders.reduce((acc, order) => acc + order.totalPrice, 0));
      setTotal(subTotal + subTotal * 0.03);
    }
  }, [orders, subTotal]);

  useEffect(() => {
    if (cartModal.isOpen) {
      // Agrega las clases overflow-hidden, h-screen y fixed al cuerpo del documento
      document.body.classList.add("overflow-hidden", "h-screen", "fixed");
    } else {
      // Quita las clases overflow-hidden, h-screen y fixed del cuerpo del documento
      document.body.classList.remove("overflow-hidden", "h-screen", "fixed");
    }
  }, [cartModal.isOpen]);

  const handleClose = useCallback(() => {
    // Set showModal to false and call onClose callback after a delay
    setShowModal(false);
    cartModal.onClose();
  }, [cartModal, setShowModal]);

  useEffect(() => {
    const handleBackButton = () => {
      handleClose();
    };

    window.history.pushState(null, null, null);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [handleClose]);

  return (
    <>
      {showModal && (
        <div
          className={`
          fixed 
          inset-0
          z-30 
          outline-none 
          focus:outline-none 
          bg-black/70
          flex 
          justify-center 
          items-center  
          overflow-x-hidden
          overflow-y-auto
          
          `}
        >
          {" "}
          <div
            className={` 
              relative
              w-full  
              h-full 
              lg:w-3/4
              2xl:w-3/5    
              mx-auto 
              items-center
             
             `}
          >
            {/* CONTENT */}
            <div
              className={`
                translate 
                duration-300 
                h-full 
                items-center
                content-center
               
                ${showModal ? "translate-y-0" : "translate-y-full"} 
                ${showModal ? "opacity-100" : "opacity-0"}
                `}
            >
              <div
                className={`
                translate 
                h-full 
               
                border-0 
                lg:rounded-2xl 
                shadow-lg 
                relative 
                flex 
                flex-col 
                lg:flex-row 
                w-full 
                bg-white 
                outline-none 
                focus:outline-none
                overflow-auto
                
                `}
              >
                <button className="py-2 pl-1" onClick={handleClose}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_642_6684)">
                      <path
                        d="M32 23H19.83L25.42 17.41L24 16L16 24L24 32L25.41 30.59L19.83 25H32V23Z"
                        fill="#293160"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_642_6684">
                        <rect
                          x="4"
                          y="4"
                          width="40"
                          height="40"
                          rx="20"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <div className="flex flex-row justify-between mx-4 border-b border-b-black/50 font-semibold text-xl items-center">
                  <span>Mi pedido</span>{" "}
                  <span className="text-lg px-1 my-1 bg-gray-200 rounded-lg">
                    Mesa {table.numeroMesa}
                  </span>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-3 my-3 px-4 flex-1 overflow-scroll">
                    {orders.map((food, key) => {
                      return <Order key={key} food={food} />;
                    })}
                  </div>

                  <div
                    name="bills"
                    className={`
                     flex 
                     flex-col 

                     py-4
                     border-t
                     border-t-black/25
                   `}
                  >
                    <div
                      className={`
                       flex 
                       flex-row 
                       font-medium 
                       justify-between
                       mx-4
                       py-1
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
                       text-lg
                       font-semibold
                       mx-4
                       py-1
                     `}
                    >
                      <span>Total</span>
                      <span>$ {total}</span>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
