import css from './Searchbar.module.css' // стилізація
import PropTypes from 'prop-types';


export const Searchbar = ({handleChange, filter, searchBtnClick}) => {

    return (
      <header className={css.Searchbar}>
        <form  onSubmit={searchBtnClick} 
        className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            name="filter"
            value={filter}
            onChange={handleChange}
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
}

Searchbar.propTypes = {
  filter: PropTypes.string.isRequired, // рядок
  handleChange: PropTypes.func.isRequired // функція
};
