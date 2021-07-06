import './sass/main.scss';
import ImageApiService from './js/apiService';
import imegesTpl from './templates/imageCards.hbs';
import LoadMoreBtn from './js/load-more-btn';

import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import * as basicLightbox from 'basiclightbox';

defaultModules.set(PNotifyMobile, {});

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
    clearGalleryContainer();
    loadMoreBtn.hide();
    return alert({
      text: 'Empty request. Please enter what you want to find',
    });
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  clearGalleryContainer();
  fetchImages();
};

const fetchImages = async () => {
  try {
    loadMoreBtn.disable();
    const imagesArray = await imageApiService.fetchImages();
    if (imagesArray.length === 0) {
      return alert({
        text: 'ERROR Image was not found. Try again..',
      });
    }
    appendImagesMarkup(imagesArray);
    loadMoreBtn.enable();
    resetForm();
    setTimeout(pageScroll, 300);
  } catch (error) {
    console.log(error);
  }
};

const appendImagesMarkup = images => {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imegesTpl(images));
};

const clearGalleryContainer = () => {
  refs.galleryContainer.innerHTML = '';
};

const pageScroll = () => {
  const element = document.querySelector('.anchor');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

const resetForm = () => refs.searchForm.reset();

const onGalleryContainerClick = evt => {
  const largeImageURL = evt.target.dataset.source;
  const isGalleryImageEl = evt.target.classList.contains('gallery-img');
  if (!isGalleryImageEl) {
    return;
  }
  const instance = basicLightbox.create(`
    <img class="basiclightbox" src="${largeImageURL}">
`);
  instance.show();
};

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
