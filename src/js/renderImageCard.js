import createImageMarkup from '../templates/imageCards.hbs';
import refs from './refs.js';

const { galleryContainer } = refs;


export default function renderImagesGallery(data) {
  const dataArray = data.hits;
  const cardMarkup = createImageMarkup(dataArray);
  galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);
}
