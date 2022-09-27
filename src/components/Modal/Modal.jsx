import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ propsModal, toggleModal }) {
  const handlerKeyEsc = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlerKeyEsc);

    return () => {
      window.removeEventListener('keydown', handlerKeyEsc);
    };
  });

  const { largeImageURL, tags } = propsModal;
  return createPortal(
    <div className={css.overlay} onClick={toggleModal}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,

  propsModal: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
