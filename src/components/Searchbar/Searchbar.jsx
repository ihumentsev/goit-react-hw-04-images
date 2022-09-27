import { useState } from 'react';
import { toast } from 'react-toastify';
import css from '../Searchbar/Searchbar.module.css';
import { MdOutlineImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function Searchbar({ handeleFormSubmit }) {
  const [searchImg, setSearchImg] = useState('');
  const [images, setImages] = useState([]);

  const handlerSearchChange = event => {
    setSearchImg(event.currentTarget.value.toLowerCase());
  };

  const handeleSubmit = event => {
    setImages([]);
    event.preventDefault();
    if (searchImg.trim() === '') {
      toast('Wow so easy!');
      return;
    }
    handeleFormSubmit(searchImg, images);
    setSearchImg('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handeleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.button}>
          <MdOutlineImageSearch className={css.react_icons} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchImg}
          onChange={handlerSearchChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handeleFormSubmit: PropTypes.func.isRequired,
};
