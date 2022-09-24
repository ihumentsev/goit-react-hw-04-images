import { Component } from 'react';
import { toast } from 'react-toastify';
import css from '../Searchbar/Searchbar.module.css';
import { MdOutlineImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchImg: '',
  };

  handlerSearchChange = event => {
    this.setState({ searchImg: event.currentTarget.value.toLowerCase() });
  };

  handeleSubmit = event => {
    event.preventDefault();
    if (this.state.searchImg.trim() === '') {
      toast('Wow so easy!');
      return;
    }
    this.props.onSubmit(this.state.searchImg);
    this.setState({ searchImg: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handeleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.button}>
            <MdOutlineImageSearch className={css.react_icons} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchImg}
            onChange={this.handlerSearchChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
