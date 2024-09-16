import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import useWaitressModal from "../../hooks/useWaitressModal";

const WaitressModal = () => {
  const waitressModal = useWaitressModal();
  const [showModal, setShowModal] = useState(waitressModal.isOpen);

  useEffect(() => {
    setShowModal(waitressModal.isOpen);
  }, [waitressModal.isOpen]);

  const handleClose = useCallback(() => {
    // Set showModal to false and call onClose callback after a delay
    setShowModal(false);
    setTimeout(() => {
      waitressModal.onClose();
    }, 300);
  }, [waitressModal]);

  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/70">
          {" "}
          <div className=" relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:min-h-screen ">
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
                translate h-fit lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none
                
                `}
              >
                {" "}
                hola
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitressModal;
