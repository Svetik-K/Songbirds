import { birdsData } from './birds.js';

const categories = document.querySelector('.categories');
const categoriesButtons = document.querySelectorAll('.categories__button');
const gallery = document.querySelector('.gallery-main__items');
const modal = document.querySelector('.modal');

let birdsArray;

// player
const audio = document.querySelector('.bird-card-player__audio'); 
const slider = document.querySelector('.bird-card-player__slider'); 
const progress = document.querySelector('.bird-card-player__progress'); 
const buttonPlay = document.querySelector('.bird-card-player__button'); 
const volume = document.querySelector('.bird-card-player__volume-slider');
const curTime = document.querySelector('.bird-card-time_current');

let minutes = '00';
let seconds = '00';

audio.addEventListener('timeupdate', updateProgress);
slider.addEventListener('click', setProgress);

buttonPlay.addEventListener('click', (e) => {
  if(e.target.classList.contains('button_play')) {
    audio.play();
    e.target.classList.remove('button_play');
    e.target.classList.add('button_pause');
  } else {
    if(e.target.classList.contains('button_pause')) {
      audio.pause();
      e.target.classList.remove('button_pause');
      e.target.classList.add('button_play');
    }
  }
  e.preventDefault();
})

volume.addEventListener('input', (e) => {
  let volumeValue = e.target.value;
  if(volumeValue === e.target.max) {
    audio.volume = 1;
  } else {
    audio.volume = Number(`0.${volumeValue}`);
  }
})

categories.addEventListener('click', (e) => {
  gallery.innerHTML = '';
  const buttonBlock = e.target.parentElement.parentElement;
  if(buttonBlock.classList.contains('categories')) {
    const categoryName = e.target.textContent;

    if(e.target.classList.contains('button_active')) {
      return;
    }
    for(let button of categoriesButtons) {
      if(button.classList.contains('button_active')) {
        button.classList.remove('button_active');
      }
    }

    e.target.classList.add('button_active');

    birdsArray = returnCategory(birdsData, categoryName);
    if(categoryName === 'Все') {
      for(let i = 0; i < birdsData.length; i++) {
        if(i !== 0) {
          for(let item of birdsData[i]) {
            createGalleryItem(item);
          }
        }
      }
    } else {
      for(let bird of birdsArray) {
        createGalleryItem(bird);
      }
    }
  }
})

gallery.addEventListener('click', (e) => {
  if(e.target.classList.contains('gallery-main__overlay')) {
    const birdName = e.target.firstChild.textContent;
    for(let category of birdsData) {
      category.forEach(item => {
        if(item.name === birdName) {
          loadBirdInfo(item);
          modal.style.display = 'flex';
        }
      })
    }
  }
  else if(e.target.classList.contains('gallery-main__title')) {
    const birdName = e.target.textContent;
    for(let category of birdsData) {
      category.forEach(item => {
        if(item.name === birdName) {
          loadBirdInfo(item);
          modal.style.display = 'flex';
        }
      })
    }
  }
})

window.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')) {
    modal.style.display = 'none';
    resetPlayer();
  }
})

function createGalleryItem(bird) {
  const galleryItem = document.createElement('div');
  galleryItem.className = 'gallery-main__item';

  const image = document.createElement('img');
  image.className = 'gallery-main__image';
  image.src = bird.image;
  image.alt = bird.name;
  galleryItem.append(image);

  const overlay = document.createElement('div');
  overlay.className = 'gallery-main__overlay';

  const overlayTitle = document.createElement('h3');
  overlayTitle.className = 'gallery-main__title';
  overlayTitle.textContent = bird.name;
  overlay.append(overlayTitle);

  galleryItem.append(overlay);
  gallery.append(galleryItem);  
}

function returnCategory(birdsData, categoryName) {
  switch(categoryName) {
    case 'Все':
      return birdsData;
    case 'Воробьиные':
      return birdsData[1];
    case 'Лесные птицы':
      return birdsData[2];
    case 'Певчие птицы':
      return birdsData[3];
    case 'Хищные птицы':
      return birdsData[4];
    case 'Морские птицы':
      return birdsData[5];
  }
}

function setTrackDuration(audio) {
  let audioDuration = audio.duration;
  const secondsDuration = audioDuration.toString().split('.')[0];
  let minutes = Math.floor(secondsDuration / 60);
  let seconds = secondsDuration % 60;
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }
  if(minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  return `${minutes}:${seconds}`;
}

function setTrackCurrent(audio) {
  let audioDuration = audio.currentTime;
  const secondsDuration = audioDuration.toString().split('.')[0];
  let minutes = Math.floor(secondsDuration / 60);
  let seconds = secondsDuration % 60;
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }
  if(minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  return `${minutes}:${seconds}`;
}

function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  curTime.textContent = setTrackCurrent(e.srcElement);
}

function setProgress(e) {
  const width = slider.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function loadBirdInfo(bird) {
  const birdImage = document.querySelector('.bird-card__image');
  birdImage.src = bird.image;
  birdImage.alt = bird.name;
  const birdName = document.querySelector('.bird-card__name');
  birdName.textContent = bird.name;
  const latinName = document.querySelector('.bird-card__species');
  latinName.textContent = bird.species;
  const birdSound = document.querySelector('.bird-card-player__audio');
  birdSound.addEventListener('loadedmetadata', () => {
    const trackDuration = document.querySelector('.bird-card-time_duration');
    const duration = setTrackDuration(birdSound);
    trackDuration.textContent = duration;
  })
  birdSound.src = bird.audio;
  const birdDescription = document.querySelector('.bird-card__description');
  birdDescription.textContent = bird.description;
}

function resetPlayer() {
  progress.style.width = `0%`;
  audio.volume = 0.2;
  buttonPlay.classList.remove('button_pause');
  buttonPlay.classList.add('button_play');
  minutes = '00';
  seconds = '00';
  curTime.textContent = `${minutes}:${seconds}`;
}