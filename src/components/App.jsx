import { Component } from "react";
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';



const MY_API_KEY = '33995663-3283b38da6c47940fd5e67885'; // мій персональний ключ з pixabay
const BASE_URL = 'https://pixabay.com/api/';
let PHOTO_NAME ="";
let showBtn = false;


export class App extends Component {

  state = {
    imagelist: [],
    page: 1,
    filter: '',
    loading: false,
    showModal: false,

  }




// INPUT - зберігаємо данні при вводі текста в input
handleChange = (event) => {
  const {name, value} = event.currentTarget;
  this.setState({[name]: value});
}

// FILTER - запуск команди пошуку
searchBtnClick = (e) => {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  PHOTO_NAME = this.state.filter.trim(); // Зберігаємо значення filter


  this.setState({imagelist: []}); // Чистемо сторінку
  this.setState({totalHits: 0});// Скидаємо лічильник
  this.setState({page: 2});// Оновлюємо номер сторінки
  showBtn = false;// Ховаємо кнопку
  

  if (this.state.filter.trim() === ''){
    alert(`Filter window is empty`);
    return;
  } else {

    this.setState({loading: true});// Запуcкаємо Лоадер
    // отримаємо данні з сервера
    fetch (`${BASE_URL}?q=${PHOTO_NAME}&page=1&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res => res.json())
    .then (imagelist => this.setState({imagelist}))
    .finally(() => this.setState({loading: false}));// Зупиняємо Лоадер

    this.setState( { filter: ''}); // очищення вмісту форми
  }
  };

// LOAD MORE - дозавантиження 
clickLoadMore = (e) =>  {
  e.preventDefault(); // Зупиняємо оновлення сторінки
  this.setState({page: this.state.page+1}); // Додаємо значення сторінки +1

   // ПЕРЕВІРКА - чи є ще сторінка для дозавантаження
    if ( this.state.imagelist.total > this.state.imagelist.hits.length){
      this.setState({loading: true});// Запуcкаємо Лоадер
      // отримаємо данні з сервера
      fetch (`${BASE_URL}?q=${PHOTO_NAME}&page=1&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.page*12}`)
      .then(res => res.json())
      .then (imagelist => this.setState({imagelist}))
      .finally(() => this.setState({loading: false}))// Зупиняємо Лоадер
    } 

}

// OPEN MODAL  - відкриття модалки
openModal = (largeImageURL, alt) => {
  this.setState(({ showModal }) => {
    return { showModal: !showModal, largeImageURL, alt };
  });
};

// CLOSE MODAL  - Закриття модалки
closeModal = () => {
  this.setState(({ showModal }) => {
    return { showModal: !showModal };
  });
};

// ПЕРЕВІРКА для кнопки Load more (відображаємо чи ні)
checkBtnLoad = () =>{
  if (this.state.imagelist.hits) {
    if (this.state.imagelist.total > this.state.imagelist.hits.length ) {
      showBtn = true;
    } else { 
      showBtn = false;
    };
  }

}

// РЕНДНЕРІНГ сторінки
  render(){
    const {filter, imagelist, loading, showModal, largeImageURL, alt } = this.state;
    this.checkBtnLoad()


    return (
      <div>
        <section>
          <Searchbar filter={filter} handleChange={this.handleChange} searchBtnClick={this.searchBtnClick}/>
        </section>
        <section>
        {imagelist && (<ImageGallery  imagelist={imagelist.hits} openModal={this.openModal}/>)}
              { loading && (<Loader/>) }
              { showBtn && (<Button clickLoadMore={this.clickLoadMore}/>) }
        </section>
        {showModal && (
          <Modal closeModal={this.closeModal} src={largeImageURL} alt={alt}/>
        )}
          
      </div>
     );
  }

};
