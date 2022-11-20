document.addEventListener('DOMContentLoaded', () => {
    disableAnswers();
    disableNextButton();
    questionSection.classList.add('inactive');
    infoSection.classList.add('inactive');
});

// returns shuffled array
function createShuffledArray(birdsData, categoryName) {
    const categoryArray = returnCategory(birdsData, categoryName); 
    let copyArr = [...categoryArray];
    const shuffledArr = copyArr.sort((a, b) => 0.5 - Math.random()); 
    return shuffledArr;
}

// shows the first question after choosing a category
function showFirstQuestion(questionArray) {
  question = questionArray[0]; 
  correctAnswer = questionArray[0].name;
  loadQuestion(questionArray[0]);
  loadAnswers(questionArray);
  disableNextButton(); 
}

// listens buttons for different categories
categories.addEventListener('click', (e) => {
  const buttonBlock = e.target.parentElement.parentElement;
  if(buttonBlock.classList.contains('questions')) {
    const categoryName = e.target.textContent;

    for(let i = 0; i < categoryButtons.length; i++) {
      if(e.target.classList.contains('button_active')) {
        return;
      } 
      for(let button of categoryButtons) {
        if(button.classList.contains('button_active')) {
          button.classList.remove('button_active');
        }
      }
    }
    e.target.classList.add('button_active');
    questionSection.classList.remove('inactive');
    clearIndicators();
    score.textContent = 0;
    enableAnswers();
    questionArray = createShuffledArray(birdsData, categoryName);
    showFirstQuestion(questionArray);
    count = 1;
  }
})

// returns category according to the button clicked
function returnCategory(birdsData, categoryName) {
    switch(categoryName) {
      case 'Разминка':
        return birdsData[0];
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

function disableAnswers() {
    answers.classList.add('inactive');
}
  
function enableAnswers() {
    answers.classList.remove('inactive');
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
    cardAudio.className = 'bird-card-player__audio';
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