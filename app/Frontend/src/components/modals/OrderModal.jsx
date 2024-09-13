import useOrderModal from "../../hooks/useOrderModal";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import AgregadoBtn from "../AgregadoBtn";
import toast from "react-hot-toast";

const OrderModal = () => {
  const orderModal = useOrderModal();
  const [showModal, setShowModal] = useState(orderModal.isOpen);
  let [quantity, setQuantity] = useState(orderModal.order.quantity);
  let [minusDisabled, setMinusDisabled] = useState(true);

  useEffect(() => {
    setShowModal(orderModal.isOpen);
  }, [orderModal]);

  useEffect(() => {
    quantity > 1 ? setMinusDisabled(false) : setMinusDisabled(true);
  }, [quantity, minusDisabled]);

  const handleClose = useCallback(() => {
    // Set showModal to false and call onClose callback after a delay
    setShowModal(false);
    setTimeout(() => {
      orderModal.onClose();
    }, 300);
  }, [orderModal, setShowModal]);

  const handleIncrement = () => {
    setQuantity((quantity += 1));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((quantity -= 1));
    }
  };

  const handleSubmit = useCallback(() => {}, []);
  return (
    <>
      {showModal && (
        <div
          className={`
          fixed 
          inset-0
          z-50 
          outline-none 
          focus:outline-none 
          bg-white/70
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
              max-h-screen 
             
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
                lg:h-[60vh] 
                lg:max-h-[600px] 
                lg:min-h-[350px] 
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
                overflow-hidden
                
                `}
              >
                {/* IMAGEN */}
                <div className="relative flex-1 ">
                  <div
                    id="image"
                    className="h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://i.pinimg.com/564x/07/21/32/072132759e23ee009f4f9ba04bdc8845.jpg)`,
                    }}
                  ></div>
                </div>
                <button
                  name="close"
                  onClick={handleClose}
                  className="border-0 hover:opacity-70 transition absolute top-0 right-0 cursor-pointer rounded-md m-3 z-[100]"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-1 rounded-xl"
                  >
                    <rect width="48" height="48" fill="white" />
                    <path
                      d="M35.4093 12.5907C34.6216 11.8031 33.3446 11.8031 32.5569 12.5907L24 21.1477L15.443 12.5907C14.6554 11.8031 13.3784 11.8031 12.5907 12.5907C11.8031 13.3784 11.8031 14.6554 12.5907 15.4431L21.1477 24L12.5907 32.5569C11.8031 33.3446 11.8031 34.6216 12.5907 35.4093C13.3784 36.1969 14.6554 36.1969 15.4431 35.4093L24 26.8523L32.5569 35.4093C33.3446 36.1969 34.6216 36.1969 35.4093 35.4093C36.1969 34.6216 36.1969 33.3446 35.4093 32.5569L26.8523 24L35.4093 15.4431C36.1969 14.6554 36.1969 13.3784 35.4093 12.5907Z"
                      fill="black"
                    />
                  </svg>
                </button>

                {/* HEADER */}
                <div className="flex flex-col px-6 py-4 gap-4 h-full flex-1">
                  <div className="flex flex-row items-center  justify-between relative text-lg font-bold">
                    <div>{orderModal.order.title}</div>
                    <div className="text-2xl md:text-xl">
                      ${orderModal.order.price}
                    </div>
                  </div>
                  <div>
                    <span className="text-lg md:text-base">
                      {orderModal.order.body}
                    </span>
                  </div>

                  {/* ADDONS */}
                  <div id="Agregados" className="flex flex-col gap-1  ">
                    <div className="font-medium text-lg">
                      Selecciona un acompañamiento:
                    </div>
                    <div className="h-full">
                      {orderModal.order.agregados && (
                        <div className="">
                          {orderModal.order.agregados.map((agregado) => {
                            return (
                              <AgregadoBtn
                                agregado={agregado}
                                key={agregado.id}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  id="footer"
                  className="flex flex-row border-t border-[#00000040] lg:border-none p-6 gap-6 lg:gap-3 items-center md:relative"
                >
                  <div className="w-fit flex flex-row justify-evenly items-center border border-[#6C6C6C] gap-[10px] p-2 rounded-[10px]">
                    <button
                      onClick={handleDecrement}
                      disabled={minusDisabled ? true : false}
                      className="disabled:opacity-50"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="4" fill="#F6F7F9" />
                        <rect
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                          fill="black"
                        />
                      </svg>
                    </button>{" "}
                    <span className="text-lg font-semibold w-6 text-center">
                      {quantity}
                    </span>
                    <button onClick={handleIncrement}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="4" fill="#F6F7F9" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                  <Button label="Agregar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;
