import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  toggleModal,
  largeImageURL,
}) {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => toggleModal({ largeImageURL, tags })}
    >
      <img className={css.image} src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func,
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};
