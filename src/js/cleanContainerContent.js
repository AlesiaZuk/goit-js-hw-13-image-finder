import refs from './refs';

const { galleryContainer } = refs;

export default function cleanContainerContent() {
  galleryContainer.innerHTML = '';
}
