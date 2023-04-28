import css from './Button.module.css'; // імпортуємо стилі

// Функціональний компонент, який відповідає за кнопку "Load more".
export const Button = ({clickLoadMore}) => {
  return (
    <button onClick={clickLoadMore} className={css.Button} type="button">
      Load more
    </button>
  );
};