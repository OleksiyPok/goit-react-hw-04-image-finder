import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImage, description, children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyDownEscape);
    };
  });

  const handleKeyDownEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay className="modal__backdrop" onClick={handleBackdropClick}>
      <ModalDiv className="modal__content">
        {children}
        <img src={largeImage} alt={description} />
      </ModalDiv>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string,
};
