import validator from 'validator/lib/isAlpha';
import debounce from 'lodash/debounce';
import * as basicLightbox from 'basiclightbox';

import refs from './refs.js';
import ImagesApiService from './apiService.js';
import renderImageCard from './renderImageCard.js';
import visibility from './visibility.js';
import cleanContainerContent from './cleanContainerContent.js';
import showError from './showError.js';

const { input, galleryList, loadMoreButton } = refs;

const imagesApiService = new ImagesApiService();

input.addEventListener('input', debounce(onSearch, 1000));
galleryList.addEventListener('click', openModal);
loadMoreButton.addEventListener('click', loadMoreImages);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.target.value.trim();

  const validatorResult = validator(imagesApiService.query);

  if (imagesApiService.query !== '') {
    if (validatorResult) {
      imagesApiService.resetPage();
      imagesApiService
        .fetchImages()
        .then(data => {
          console.log(data.hits.length);
          if (data.total !== 0) {
            cleanContainerContent();
            renderImageCard(data);
            visibility(data);
          } else {
            showError();
          }
        })
        .catch(() => {
          showError();
        });
    } else {
      showError();
    }
  }
}

function openModal(e) {
  e.preventDefault();

  const instance = basicLightbox.create(`  
        <div class="lightbox__content">
          <img class="lightbox__image" src="${e.target.dataset.sourse}" alt="${e.target.alt}" />
        </div>
     `);

  instance.show();

  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
}

function loadMoreImages() {
  imagesApiService.incrementPage();
  imagesApiService.fetchImages().then(data => {
    const elem = galleryList.lastElementChild;

    visibility(data);
    renderImageCard(data);

    const scrollElement = elem.nextElementSibling;

    scrollElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}
