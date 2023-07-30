import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import { LiStyled, ImgStyled } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webImage, description, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <LiStyled className="gallery-item">
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImage={largeImage}
          description={description}
        />
      )}
      <ImgStyled src={webImage} alt={description} onClick={toggleModal} />
    </LiStyled>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
};
