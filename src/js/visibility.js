import refs from './refs';

const { loadMoreButton } = refs;

export default function visibility() {
  loadMoreButton.classList.remove('button_is-hidden');
}
