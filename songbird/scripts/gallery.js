import { birdsData } from './birds.js';

const categories = document.querySelector('.categories');
const categoriesButtons = document.querySelectorAll('.categories__button');
const gallery = document.querySelector('.gallery-main__items');
const modal = document.querySelector('.modal');

let birdsArray;

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
          createBirdModal(item);
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
          createBirdModal(item);
          modal.style.display = 'flex';
        }
      })
    }
  }
})

window.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')) {
    modal.style.display = 'none';
    modal.innerHTML = '';
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

function createBirdModal(bird) {
  const birdCard = document.createElement('div');
  birdCard.className = 'modal__bird-card bird-card';

  const basicInfo = document.createElement('div');
  basicInfo.className = 'bird-card__basic';

  const pictureWrapper = document.createElement('div');
  pictureWrapper.className = 'bird-card__picture-wrapper';

  const picture = document.createElement('div');
  picture.className = 'bird-card__picture';

  const image = document.createElement('img');
  image.className = 'bird-card__image';
  image.src = bird.image;
  image.alt = bird.name;
  picture.append(image);
  pictureWrapper.append(picture);
  basicInfo.append(pictureWrapper);

  const otherInfo = document.createElement('div');
  otherInfo.className = 'bird-card__other';

  const birdName = document.createElement('h4');
  birdName.className = 'bird-card__name';
  birdName.textContent = bird.name;
  otherInfo.append(birdName);

  const birdSpecies = document.createElement('h5');
  birdSpecies.className = 'bird-card__species';
  birdSpecies.textContent = bird.species;
  otherInfo.append(birdSpecies);
  basicInfo.append(otherInfo);
  birdCard.append(basicInfo);
  modal.append(birdCard);

  //player
  const birdCardPlayer = document.createElement('div');
  birdCardPlayer.className = 'bird-card__player bird-card-player';

  const wrapper = document.createElement('div');
  wrapper.className = 'bird-card-player__upper-wrapper';

  const playButton = document.createElement('button');
  playButton.className = 'bird-card-player__button button_play';
  wrapper.append(playButton);
  birdCardPlayer.append(wrapper);

  const sliderWrapper = document.createElement('div');
  sliderWrapper.className = 'bird-card-player__slider-wrapper';

  const slider = document.createElement('div');
  slider.className = 'bird-card-player__slider';

  const progress = document.createElement('div');
  progress.className = 'bird-card-player__progress';
  slider.append(progress);
  sliderWrapper.append(slider);
  wrapper.append(sliderWrapper);

  const timeWrapper = document.createElement('div');
  timeWrapper.className = 'bird-card-player__time-wrapper';

  const curTime = document.createElement('span');
  curTime.className = 'bird-card-time bird-card-time_current';
  curTime.textContent = '00:00';
  timeWrapper.append(curTime);

  const cardAudio = document.createElement('audio');
  const duration = document.createElement('span');
  duration.className = 'bird-card-time bird-card-time_duration';
  cardAudio.addEventListener('loadedmetadata', () => {
    const trackLength = setTrackDuration(cardAudio);
    duration.innerHTML = trackLength;
  })
  cardAudio.src = bird.audio;
  birdCardPlayer.append(cardAudio);
  timeWrapper.append(duration);
  sliderWrapper.append(timeWrapper);

  const volumeWrapper = document.createElement('div');
  volumeWrapper.className = 'bird-card-player__volume-wrapper';

  const soundButton = document.createElement('button');
  soundButton.className = 'bird-card-player__button-sound button_volume-up';
  volumeWrapper.append(soundButton);

  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.className = 'bird-card-player__volume-slider';
  volumeSlider.max = '100';
  volumeSlider.value = '20';
  volumeWrapper.append(volumeSlider);

  birdCardPlayer.append(volumeWrapper);
  otherInfo.append(birdCardPlayer);

  const description = document.createElement('div');
  description.className = 'bird-card__description';
  description.textContent = bird.description;
  birdCard.append(description);
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

document.addEventListener('click', (e) => console.log(e.target))