import useOrderModal from "../../hooks/useOrderModal";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";

const OrderModal = () => {
  const orderModal = useOrderModal();

  const [showModal, setShowModal] = useState(orderModal.callisOpen);

  useEffect(() => {
    setShowModal(orderModal.isOpen);
  }, [orderModal]);

  const handleClose = useCallback(() => {
    // Set showModal to false and call onClose callback after a delay
    setShowModal(false);
    setTimeout(() => {
      orderModal.onClose();
    }, 300);
  }, [orderModal]);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white/70">
          {" "}
          <div className=" relative w-full md:w-3/6 lg:w-2/5 md:max-w-[590px] mx-auto h-full md:min-h-screen shadow-xl">
            {/* CONTENT */}
            <div
              className={`
                translate 
                duration-300 
                h-full 
                content-center
                ${showModal ? "translate-y-0" : "translate-y-full"} 
                ${showModal ? "opacity-100" : "opacity-0"}
                `}
            >
              <div
                className={`
                translate h-fit lg:h-auto md:h-auto border-0 md:rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
                overflow-hidden 
                `}
              >
                <div className="relative">
                  <img
                    src="https://i.pinimg.com/564x/07/21/32/072132759e23ee009f4f9ba04bdc8845.jpg"
                    alt=""
                    className={`
                      h-[45vh]
                      w-full
                      
                      `}
                  />
                  <button
                    onClick={handleClose}
                    className=" border-0 hover:opacity-70 transition absolute top-0 right-0 cursor-pointer rounded-md p-2"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="p-2 rounded-xl"
                    >
                      <rect width="48" height="48" fill="white" />
                      <path
                        d="M35.4093 12.5907C34.6216 11.8031 33.3446 11.8031 32.5569 12.5907L24 21.1477L15.443 12.5907C14.6554 11.8031 13.3784 11.8031 12.5907 12.5907C11.8031 13.3784 11.8031 14.6554 12.5907 15.4431L21.1477 24L12.5907 32.5569C11.8031 33.3446 11.8031 34.6216 12.5907 35.4093C13.3784 36.1969 14.6554 36.1969 15.4431 35.4093L24 26.8523L32.5569 35.4093C33.3446 36.1969 34.6216 36.1969 35.4093 35.4093C36.1969 34.6216 36.1969 33.3446 35.4093 32.5569L26.8523 24L35.4093 15.4431C36.1969 14.6554 36.1969 13.3784 35.4093 12.5907Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col px-6 py-4 gap-4">
                  <div className="flex flex-row items-center  justify-between relative text-lg font-bold">
                    <div>{orderModal.order.title}</div>
                    <div className="text-xl">${orderModal.order.price}</div>
                  </div>
                  <div>
                    <span>{orderModal.order.body}</span>
                  </div>
                  <div className="font-medium text-lg">Escoge tu agregado:</div>
                  <div className="">
                    {orderModal.order.agregados && (
                      <div className="">
                        {orderModal.order.agregados.map((agregado) => {
                          return (
                            <div
                              key={agregado.id}
                              id={agregado.id}
                              className="flex justify-start gap-2"
                            >
                              <div className="flex flex-row items-center">
                                <div className="w-6 xl:w-9 h-9 xl:h-12  flex justify-start items-center">
                                  <input
                                    type="radio"
                                    id={`${agregado.id}`}
                                    name="agregado"
                                    value={agregado.id}
                                    className="w-4 xl:w-5 h-4 xl:h-5  "
                                  />
                                </div>
                                <span className="capitalize text-sm md:text-base ">
                                  {agregado?.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row border-t border-[#00000040] p-6 gap-6 items-center ">
                  <div className="w-fit flex flex-row justify-evenly items-center border border-[#6C6C6C] gap-[10px] p-2 rounded-[10px]">
                    <button>
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
                      {orderModal.order.quantity}
                    </span>
                    <button>
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
