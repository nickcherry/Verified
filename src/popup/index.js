import { normalizeUrl } from '../utils/urlUtils';

document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url');
  const newContentForm = document.getElementById('new-content-form');
  const errors = document.getElementById('errors');

  urlInput.addEventListener('keydown', () => errors.innerHTML = '');

  newContentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = normalizeUrl(urlInput.value);
    if (url) {
      alert(url);
    } else {
      errors.innerHTML = 'Please enter a valid URL.';
    }
  });
});