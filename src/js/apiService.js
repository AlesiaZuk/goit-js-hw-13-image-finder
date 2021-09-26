const API_KEY = '23521874-546d3070950852676c2506258';
const BASE_URL = 'https://pixabay.com/api';
const per_page = 12;

export default function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${API_KEY}`;
  return fetch(url).then(response => {
    if (response.status === 404) {
      return;
    }
    return response.json();
  });
}

// export default{
//   api_key: '23521874-546d3070950852676c2506258',
//   base_url: 'https://pixabay.com/api'
// }
