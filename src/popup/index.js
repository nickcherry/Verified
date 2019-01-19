/**************************************************************************/
/* Imports */
/**************************************************************************/

import { normalizeUrl } from '../utils/urlUtils';

import { PUBLISH } from '../constants/messageTypes';


/**************************************************************************/
/* Popup Behavior */
/**************************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url');
  const newContentForm = document.getElementById('new-content-form');
  const errors = document.getElementById('errors');

  const setErrorsText = (text) => errors.innerHTML = text;

  urlInput.addEventListener('keydown', () => setErrorsText(''));

  newContentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = normalizeUrl(urlInput.value);
    if (!url) return setErrorsText('Please enter a valid URL.');

    chrome.runtime.sendMessage({ type: PUBLISH, url }, () => {
      alert('Published!');
    });
  });
});