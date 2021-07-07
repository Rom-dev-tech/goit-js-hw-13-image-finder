const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22356210-f5a6fb995cd777b2b01184cc9';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: `${API_KEY}`,
    });
    const url = `${BASE_URL}/?${searchParams}`;

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
