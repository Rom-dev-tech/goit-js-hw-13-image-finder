const API_KEY = '22356210-f5a6fb995cd777b2b01184cc9';
const BASE_URL = 'https://pixabay.com/api';
const PER_PAGE = 12;

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${API_KEY}`;

    const response = await fetch(url);
    const fetchObject = await response.json();
    const imagesArray = await fetchObject.hits;
    this.incrementPage();

    return imagesArray;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
