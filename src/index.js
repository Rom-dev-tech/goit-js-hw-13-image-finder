import './sass/main.scss';
import ImageApiService from './js/apiService';
import imegesTpl from './templates/imageCards.hbs';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.getElementById('search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
const imageApiService = new ImageApiService();

const onSearch = evt => {
  evt.preventDefault();

  imageApiService.query = evt.currentTarget.elements.query.value;

  if (imageApiService.searchQuery === '') {
    return alert('ERROR');
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  clearGalleryContainer();
  fetchImages();
};

const fetchImages = () => {
  loadMoreBtn.disable();
  imageApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
  });
};

const appendImagesMarkup = images => {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imegesTpl(images));
};

const clearGalleryContainer = () => {
  refs.galleryContainer.innerHTML = '';
};

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
