// import './sass/main.scss';
import ImageApiService from './js/apiService';

const refs = {
  searchForm: document.getElementById('search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  galleryContainer: document.querySelector('.gallery'),
};

const imageApiService = new ImageApiService();

const onSearch = evt => {
  evt.preventDefault();

  imageApiService.query = evt.currentTarget.elements.query.value;
  imageApiService.resetPage();
  imageApiService.fetchImages();
};

const onLoadMore = () => {
  imageApiService.fetchImages();
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
