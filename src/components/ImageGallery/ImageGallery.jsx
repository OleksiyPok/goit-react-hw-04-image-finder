import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import { UlStyled } from './ImageGallery.styled';

const ImageGallery = ({ gallery }) => {
  const galleryItems = gallery;

  return (
    <UlStyled className="gallery">
      {galleryItems.map(item => (
        <ImageGalleryItem
          key={item.id}
          webImage={item.webformatURL}
          description={item.tags}
          largeImage={item.largeImageURL}
        />
      ))}
    </UlStyled>
  );
};

export default ImageGallery;

ImageGallery.propTypes = { gallery: PropTypes.array.isRequired };
