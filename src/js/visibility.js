import refs from './refs';

const { loadMoreButton } = refs;

export default function visibility(data) {
  if (data.totalHits > 12 && data.hits.length === 12) {
    loadMoreButton.classList.remove('button_is-hidden');
  } else {
    loadMoreButton.classList.add('button_is-hidden');
  }
}
