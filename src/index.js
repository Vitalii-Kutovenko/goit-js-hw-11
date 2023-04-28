import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '35867216-72ed1ceebea896f77546d0ac6';
const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  
  const searchQuery = inputEl.value.trim();
  
  if (searchQuery === '') {
    return;
  }
  
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    
    const hits = response.data.hits;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    
    const markup = createGalleryMarkup(hits);
    
    galleryEl.innerHTML = markup;
    
    const lightbox = new SimpleLightbox('.gallery a');
    
  } catch (error) {
    console.log(error);
  }
}

function createGalleryMarkup(images) {
  return images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    })
    .join('');
}


async function onSearch(event) {
  event.preventDefault();
  
  const searchQuery = inputEl.value.trim();
  
  if (searchQuery === '') {
    return;
  }
  
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    
    const hits = response.data.hits;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    
    galleryEl.innerHTML = ''; // Очищаем содержимое галереи
    
    const markup = createGalleryMarkup(hits);
    
    galleryEl.innerHTML = markup;
    
    const lightbox = new SimpleLightbox('.gallery a');
    
  } catch (error) {
    console.log(error);
  }
}