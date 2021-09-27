import validator from 'validator/lib/isAlpha';
import debounce from 'lodash/debounce';
import * as basicLightbox from 'basiclightbox';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
defaultModules.set(PNotifyMobile, {});
defaults.delay = 3000;

import refs from './refs.js';
import fetchImages from './apiService';
import renderImageCard from './renderImageCard.js';
import cleanContainerContent from './cleanContainerContent';

const { input, galleryList, loadMoreButton } = refs;
let page = 1;
let searchQuery = '';

input.addEventListener('input', debounce(onSearch, 1000));
galleryList.addEventListener('click', openModal);
loadMoreButton.addEventListener('click', loadMoreImages);

function onSearch(e) {
  e.preventDefault();

  searchQuery = e.target.value.trim();
  const validatorResult = validator(searchQuery);
  console.log(validatorResult);

  if (searchQuery !== '') {
    if (validatorResult) {
      page = 1;
      fetchImages(searchQuery, page)
        .then(data => {
          console.log(data.total);
          if (data.total !== 0) {
            cleanContainerContent();
            renderImageCard(data);
            visibility();
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

  console.log(e.target.dataset.sourse);

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

function loadMoreImages(e) {
  page += 1;
  fetchImages(searchQuery, page).then(data => {
    const elem = galleryList.lastElementChild;
    console.log(elem);

    renderImageCard(data);

    const scrollElement = elem.nextElementSibling;
    console.log(scrollElement);
    scrollElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

function visibility() {
  loadMoreButton.classList.remove('button_is-hidden');
}

function showError() {
  error({
    text: `Images with this keyword don't exist, check your spelling!`,
  });
}

function showAllert() {
  alert({
    text: `Too many Matches found. Please enter a more specific query!`,
  });
}

function showNotice() {
  alert({
    text: `Please, specify your request!`,
  });
}
