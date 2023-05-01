import css from './Button.module.css'; // імпортуємо стилі
import PropTypes from 'prop-types'; // типизація пропсів

// Функціональний компонент, який відповідає за кнопку "Load more".
export const Button = ({clickLoadMore}) => {
  return (
    <button onClick={clickLoadMore} className={css.Button} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  clickLoadMore: PropTypes.func.isRequired // функція
};