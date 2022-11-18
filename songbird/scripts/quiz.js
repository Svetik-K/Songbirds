import { birdsData } from './birds.js';

// audio players
const audioMain = document.querySelector('.main-player__audio');
const sliderMain = document.querySelector('.main-player__slider');
const progressMain = document.querySelector('.main-player__progress');
const buttonPlayMain = document.querySelector('.main-player__button');
const audioInfo = document.querySelector('.info-player__audio');
const sliderInfo = document.querySelector('.info-player__slider');
const progressInfo = document.querySelector('.info-player__progress');
const buttonPlayInfo = document.querySelector('.info-player__button');
const volumeMain = document.querySelector('.main-player__volume-slider');
const volumeInfo = document.querySelector('.info-player__volume-slider');

audioMain.addEventListener('timeupdate', updateProgressMain);
sliderMain.addEventListener('click', setProgressMain);
audioInfo.addEventListener('timeupdate', updateProgressInfo);
sliderInfo.addEventListener('click', setProgressInfo);

// listens clicks on play in question section
buttonPlayMain.addEventListener('click', (e) => {
  if(e.target.classList.contains('button_play')) {
    audioMain.play();
    e.target.classList.remove('button_play');
    e.target.classList.add('button_pause');
  } else {
    if(e.target.classList.contains('button_pause')) {
      audioMain.pause();
      e.target.classList.remove('button_pause');
      e.target.classList.add('button_play');
    }
  }
  e.preventDefault();
})

// changes volume in question section
volumeMain.addEventListener('input', (e) => {
  let volumeValue = e.target.value;
  if(volumeValue === e.target.max) {
    audioMain.volume = 1;
  } else {
    audioMain.volume = Number(`0.${volumeValue}`);
  }
})

// listens clicks on play in info section
buttonPlayInfo.addEventListener('click', (e) => {
  if(e.target.classList.contains('button_play')) {
    audioInfo.play();
    e.target.classList.remove('button_play');
    e.target.classList.add('button_pause');
  } else {
    if(e.target.classList.contains('button_pause')) {
      audioInfo.pause();
      e.target.classList.remove('button_pause');
      e.target.classList.add('button_play');
    }
  }
  e.preventDefault();
})

// changes volume in info section
volumeInfo.addEventListener('input', (e) => {
  let volumeValue = e.target.value;
  if(volumeValue === e.target.max) {
    audioInfo.volume = 1;
  } else {
    audioInfo.volume = Number(`0.${volumeValue}`);
  }
})

// updates progressbar in question player on click
function updateProgressMain(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressMain.style.width = `${progressPercent}%`;
}

// shows progress when sound is palying in question player
function setProgressMain(e) {
  const width = sliderMain.clientWidth;
  const clickX = e.offsetX;
  const duration = audioMain.duration;
  audioMain.currentTime = (clickX / width) * duration;
}

// updates progressbar in info player on click
function updateProgressInfo(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressInfo.style.width = `${progressPercent}%`;
}

// shows progress when sound is palying in info player
function setProgressInfo(e) {
  const width = sliderInfo.clientWidth;
  const clickX = e.offsetX;
  const duration = audioInfo.duration;
  audioInfo.currentTime = (clickX / width) * duration;
}

function setTimeCounterMain() {
  gameCounter = setInterval(() => { 
      if(seconds == 59) {
          seconds = '00';
          minutes = parseInt(minutes) + 1;
      }

      seconds = parseInt(seconds) + 1;
      if(seconds < 10) {
          seconds = '0' + seconds;
      }
      if(minutes.toString().length === 1) {
          minutes = '0' + minutes;
      }
      if( minutes == 59 && seconds == 59) {
          setCounterToNull();
          addLose();
      }
      const time = document.querySelector('.time_duration');
      time.textContent = `Time: ${minutes}:${seconds}`;     

  }, 1000);
}


// resets question player
function resetPlayerMain() {
  progressMain.style.width = `0%`;
  audioMain.volume = 0.2;
  buttonPlayMain.classList.remove('button_pause');
  buttonPlayMain.classList.add('button_play');
}

//resets info player
function resetPlayerInfo() {
  progressInfo.style.width = `0%`;
  audioInfo.volume = 0.2;
  buttonPlayInfo.classList.remove('button_pause');
  buttonPlayInfo.classList.add('button_play');
}

// Quiz logic
const categories = document.querySelector('.questions');
const categoryButtons = document.querySelectorAll('.questions__button');
const answers = document.querySelector('.answers');
const answersButtons = document.querySelectorAll('.answers__button');
const nextButton = document.querySelector('.quiz-footer__button');
const score = document.querySelector('.player-score');
const questionSection = document.querySelector('.question');
const infoSection = document.querySelector('.bird-info');

let questionArray;
let count;
let question;
let correctAnswer;

document.addEventListener('DOMContentLoaded', () => {
  disableAnswers();
  disableNextButton();
  questionSection.classList.add('inactive');
  infoSection.classList.add('inactive');
});

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

// listens clicks on Next button
nextButton.addEventListener('click', (e) => {
  if(count === 6) {
    nextButton.disabled = true;
    return;
  }
  loadNextQuestion(questionArray, count);
  disableNextButton(); 
  count++;
  e.preventDefault();
});

// listen clicks on answers
answers.addEventListener('click', (e) => {
  const answersBlock = e.target.parentElement.parentElement;
  if(answersBlock.classList.contains('answers')) {
    const birdName = e.target.textContent;
    if(birdName === correctAnswer) {
      showAnswer(questionArray[count - 1]);
      loadBirdInfo(questionArray[count - 1]);

      infoSection.classList.remove('inactive');
      e.target.classList.add('correct');

      let resultScore = countScore();
      let curResult = parseInt(score.textContent);
      score.textContent = curResult + resultScore;

      audioMain.pause();
      enableNextButton();

      if(count === 6) {
        disableNextButton();
        showResultsPage();
      }
    } else {
      e.target.classList.add('wrong');
      for(let bird of questionArray) {
        if(bird.name === e.target.textContent) {
          loadBirdInfo(bird);
          infoSection.classList.remove('inactive');
        }
      }
    }
  }
})

// shows the first question after choosing a category
function showFirstQuestion(questionArray) {
  question = questionArray[0]; 
  correctAnswer = questionArray[0].name;
  loadQuestion(questionArray[0]);
  loadAnswers(questionArray);
  disableNextButton(); 
}

// returns shuffled array
function createShuffledArray(birdsData, categoryName) {
  const categoryArray = returnCategory(birdsData, categoryName); // returns an array from birdsData
  let copyArr = [...categoryArray];
  const shuffledArr = copyArr.sort((a, b) => 0.5 - Math.random()); // shuffles initial array
  return shuffledArr;
}

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

// loads question to the question block
function loadQuestion(bird) {
  resetPlayerMain();
  const birdSound = document.querySelector('.main-player__audio');
  const questionImage = document.querySelector('.question__image');
  questionImage.src = '../assets/img/question.png';
  const birdName = document.querySelector('.question__bird-name');
  birdName.textContent = '********';
  birdSound.addEventListener('loadedmetadata', () => {
    const trackDuration = document.querySelector('.time_duration');
    const duration = setTrackDuration(birdSound);
    trackDuration.innerHTML = duration;  
  }) 
  birdSound.src = bird.audio; 
  questionImage.alt = bird.name;
}

// load answers variants
function loadAnswers(arr) {
  let cloneArr = [...arr];
  const shuffledArray = cloneArr.sort((a, b) => 0.5 - Math.random());
  answersButtons.forEach((button, index) => {
    button.textContent = shuffledArray[index].name;
  }) 
}

// shows answer in the question block
function showAnswer(bird) {
  const questionImage = document.querySelector('.question__image');
  questionImage.src = bird.image;
  const birdName = document.querySelector('.question__bird-name');
  birdName.textContent = bird.name;
}

// loads bird's info into the bird's card
function loadBirdInfo(bird) {
  resetPlayerInfo();
  const birdImage = document.querySelector('.bird-info__image');
  birdImage.src = bird.image;
  birdImage.alt = bird.name;
  const birdName = document.querySelector('.bird-info__name');
  birdName.textContent = bird.name;
  const latinName = document.querySelector('.bird-info__species');
  latinName.textContent = bird.species;
  const birdSound = document.querySelector('.info-player__audio');
  birdSound.addEventListener('loadedmetadata', () => {
    const trackDuration = document.querySelector('.info-time_duration');
    const duration = setTrackDuration(birdSound);
    trackDuration.textContent = duration;
  })
  birdSound.src = bird.audio;
  const birdDescription = document.querySelector('.bird-info__description');
  birdDescription.textContent = bird.description;
}

// shows track's duration
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

// clears buttons' indicators
function clearIndicators() {
  const answersButtons = document.querySelectorAll('.answers__button');
  for(let button of answersButtons) {
    if(button.classList.contains('wrong')) {
      button.classList.remove('wrong');
    }
  }
  for(let button of answersButtons) {
    if(button.classList.contains('correct')) {
      button.classList.remove('correct');
    }
  }
}

// loads next question from the shuffled array
function loadNextQuestion(questionArray, count) {
  const answersBlock = document.querySelector('.answers');
  if(answersBlock.classList.contains('inactive')) {
    answersBlock.classList.remove('inactive');
  }
  clearIndicators();
  loadQuestion(questionArray[count]);
  loadAnswers(questionArray);
  correctAnswer = questionArray[count].name;
  nextButton.disabled = true;
}

// returns the number of earned scores
function countScore() {
  let counter = 0;
  const answerButtons = document.querySelectorAll('.answers__button');
  for(let button of answerButtons) {
    if(button.classList.contains('wrong')) {
      counter++;
    }
  }
  switch(counter) {
    case 5:
      return 0;
    case 4:
      return 1;
    case 3:
      return 2;
    case 2:
      return 3;
    case 1:
      return 4;
    case 0:
      return 5;
  }
}

function disableAnswers() {
  answers.classList.add('inactive');
}

function enableAnswers() {
  answers.classList.remove('inactive');
}

function disableNextButton() {
  nextButton.disabled = true;
  nextButton.classList.add('disabled');
}

function enableNextButton() {
  nextButton.disabled = false;
  nextButton.classList.remove('disabled');
}

function showResultsPage() {

  setTimeout(() => {
    window.location = './results.html';
  }, 1000)
  
}