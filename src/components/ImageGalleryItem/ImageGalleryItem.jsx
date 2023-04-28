import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types'; // типизація пропсів



export const ImageGalleryItem = ({imagelist, openModal}) => {
   if (imagelist) {
      return (
        <>
        {imagelist.map(item => (
          <li 
              key={item.id}  
              // onClick={openModal}
              onClick={(evt)=>{openModal(item.largeImageURL, item.tags);}}
              className={css.galleryItem}>
            <img
              id={item.id} 
              loading="lazy"
              className={css.ImageGalleryItem_image}
              src={item.webformatURL}
              alt={item.tags}
            />
          </li>
          ))}
        </>
    )
   }

}


ImageGalleryItem.propTypes = {
  imagelist: PropTypes.arrayOf(PropTypes.object).isRequired, // масив об'єктів

};
