import PropTypes from "prop-types";
import useOrderModal from "../../hooks/useOrderModal";
import { useCallback, useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, onOpen, title, body, image, disabled }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {}, []);
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.string,
  disabled: PropTypes.bool,
};
