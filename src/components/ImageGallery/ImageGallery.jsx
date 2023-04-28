import css from './ImageGallery.module.css';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types'; // типизація пропсів


export const ImageGallery = ({imagelist, openModal}) => {


 if (imagelist) {
   if (imagelist.length > 0){
      return (
         <>
            <ul className={css.ImageGallery}>
              <ImageGalleryItem imagelist ={imagelist} openModal={openModal}/>
            </ul>
         </>

      )
    } else {
      return (
         <>
            <div className={css.image_404}>
               <img src="https://rs.ui.ac.id/umum/files/promosi/20220325112709-1.jpeg" alt="404" />
            </div>
         </>

      )

    }
 }

}

ImageGallery.propTypes = {
   imagelist: PropTypes.arrayOf(PropTypes.object).isRequired, // масив об'єктів
   openModal: PropTypes.func.isRequired // функція
 };
 
