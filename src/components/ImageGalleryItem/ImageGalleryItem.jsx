import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import { Li, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webImage, description, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Li className="gallery-item">
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImage={largeImage}
          description={description}
        ></Modal>
      )}
      <Img src={webImage} alt={description} onClick={toggleModal} />
    </Li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
};
