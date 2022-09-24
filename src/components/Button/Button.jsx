import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ LoadMore }) {
  return (
    <button type="button" className={css.button} onClick={LoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  LoadMore: PropTypes.func,
};
