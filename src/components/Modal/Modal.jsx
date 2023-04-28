// import * as basicLightbox from 'basiclightbox'
import css from './Modal.module.css';
import PropTypes from 'prop-types'; // типизація пропсів


export const Modal = ({closeModal, src, alt})=>{
    return(
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    )
}


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired, // функція
  src: PropTypes.string.isRequired, // строка
  alt: PropTypes.string.isRequired // строка
};