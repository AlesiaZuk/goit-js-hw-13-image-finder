const API_KEY = '23521874-546d3070950852676c2506258';
const BASE_URL = 'https://pixabay.com/api';
const per_page = 12;

// export default function fetchImages(searchQuery, page) {
//   const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${API_KEY}`;
//   return fetch(url).then(response => {
//     if (response.status === 404) {
//       return;
//     }
//     return response.json();
//   });
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${per_page}&key=${API_KEY}`;

    return fetch(url).then(response => {
      if (response.status === 404) {
        return;
      }
      return response.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
