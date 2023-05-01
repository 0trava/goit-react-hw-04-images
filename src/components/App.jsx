import {useState } from 'react'; // пакети для роботи зі станом
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';

const MY_API_KEY = '33995663-3283b38da6c47940fd5e67885'; // мій персональний ключ з pixabay
const BASE_URL = 'https://pixabay.com/api/';
let largeImageURL ="";
let alt = "";
let PHOTO_NAME ="";
let showBtn = false;

export const App = () => {


const [filter, setFilter] = useState(''); // Хук для filter
const [loading, setLoading] = useState(false); // Хук для loading
const [showModal, setShowModal] =useState(false); // Хук для showModal
const [page, setPage] = useState(1); // Хук для page
const [imageList, setImageList] = useState('');




// INPUT - зберігаємо данні при вводі текста в input
const handleChange = (event) => {
  setFilter(event.currentTarget.value)
}

// FILTER - запуск команди пошуку
const searchBtnClick = (e) => {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  PHOTO_NAME = filter.trim(); // Зберігаємо значення filter


  setImageList(''); // Чистемо сторінку
  setPage(2);// Оновлюємо номер сторінки
  showBtn = false;// Ховаємо кнопку
  

  if (filter.trim() === ''){
    alert(`Filter window is empty`);
    return;
  } else {

    setLoading(true);// Запуcкаємо Лоадер
    // отримаємо данні з сервера
    fetch (`${BASE_URL}?q=${PHOTO_NAME}&page=1&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res => res.json())
    .then (image => setImageList(image))
    .finally(() => setLoading(false));// Зупиняємо Лоадер

    setFilter(""); // очищення вмісту форми
  }
  };

// LOAD MORE - дозавантиження 
const clickLoadMore = (e) =>  {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  setPage(page => page + 1); // Додаємо значення сторінки +1

   // ПЕРЕВІРКА - чи є ще сторінка для дозавантаження
    if ( imageList.total > imageList.hits.length){
      setLoading(true);// Запуcкаємо Лоадер
      // отримаємо данні з сервера
      fetch (`${BASE_URL}?q=${PHOTO_NAME}&page=1&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=${page*12}`)
      .then(res => res.json())
      .then (image => setImageList(image))
      .finally(() => setLoading(false));// Зупиняємо Лоадер
    } 

}

// OPEN MODAL  - відкриття модалки
const openModal = (getlargeImageURL, getAlt) => {
    setShowModal(true);
    largeImageURL = getlargeImageURL;
    alt = getAlt;
    return { showModal, largeImageURL, alt };
};

// CLOSE MODAL  - Закриття модалки
const closeModal = () => {
    setShowModal(false);
    return { showModal };

};

// ПЕРЕВІРКА для кнопки Load more (відображаємо чи ні)
const checkBtnLoad = () =>{
  if (imageList.hits) {
    if (imageList.total > imageList.hits.length ) {
      showBtn = true;
    } else { 
      showBtn = false;
    };
  }
}

checkBtnLoad()
// РЕНДНЕРІНГ сторінки



    return (
      <div>
        <section>
          <Searchbar filter={filter} handleChange={handleChange} searchBtnClick={searchBtnClick}/>
        </section>
        <section>
        {imageList && (<ImageGallery  imagelist={imageList.hits} openModal={openModal}/>)}
              { loading && (<Loader/>) }
              { showBtn && (<Button clickLoadMore={clickLoadMore}/>) }
        </section>
        {showModal && (
          <Modal closeModal={closeModal} src={largeImageURL} alt={alt}/>
        )}
          
      </div>
     );

};
