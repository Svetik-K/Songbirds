import { birds } from './birds.js';
import { birdsDataEn } from './birds-en.js';

const translation = {
  'ru': {
    'link-main': 'На главную',
    'link-gallery': 'Галерея',
    'button-warm-up': 'Разминка',
    'button-passerines': 'Воробьиные',
    'button-forest-birds': 'Лесные птицы',
    'button-songbirds': 'Певчие птицы',
    'button-predator-birds': 'Хищные птицы',
    'button-sea-birds': 'Морские птицы',
    'button-next': 'Следующий'
  },
  'en': {
    'link-main': 'Start',
    'link-gallery': 'Gallery',
    'button-warm-up': 'Warm up',
    'button-passerines': 'Passerines',
    'button-forest-birds': 'Forest birds',
    'button-songbirds': 'Songbirds',
    'button-predator-birds': 'Predator birds',
    'button-sea-birds': 'Sea birds',
    'button-next': 'Next'
  }
}

let birdsData;
let message;

const language = localStorage.lang || 'ru';
getTranslate(language);
if(language === 'en') {
  birdsData =[...birdsDataEn];
  message = `Listen to the bird's song and choose the name of the bird whose voice was just heard.`
}
else if(language === 'ru') {
  birdsData = [...birds];
  message = 'Прослушайте звук, издаваемый птицей, и выберите название птицы, чей голос прозвучал.'
}

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
const curTimeMain = document.querySelector('.time_current');
const curTimeInfo = document.querySelector('.info-time_current');

audioMain.addEventListener('timeupdate', updateProgressMain);
sliderMain.addEventListener('click', setProgressMain);
audioInfo.addEventListener('timeupdate', updateProgressInfo);
sliderInfo.addEventListener('click', setProgressInfo);

let minutes = '00';
let seconds = '00';
let minutesInfo = '00';
let secondsInfo = '00';


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
  curTimeMain.textContent = setTrackCurrent(e.srcElement);
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
  curTimeInfo.textContent = setTrackCurrent(e.srcElement);
}

// shows progress when sound is palying in info player
function setProgressInfo(e) {
  const width = sliderInfo.clientWidth;
  const clickX = e.offsetX;
  const duration = audioInfo.duration;
  audioInfo.currentTime = (clickX / width) * duration;
}

// resets question player
function resetPlayerMain() {
  progressMain.style.width = `0%`;
  audioMain.volume = 0.2;
  buttonPlayMain.classList.remove('button_pause');
  buttonPlayMain.classList.add('button_play');
  minutes = '00';
  seconds = '00';
  curTimeMain.textContent = `${minutes}:${seconds}`;
}

//resets info player
function resetPlayerInfo() {
  progressInfo.style.width = `0%`;
  audioInfo.volume = 0.2;
  buttonPlayInfo.classList.remove('button_pause');
  buttonPlayInfo.classList.add('button_play');
  minutesInfo = '00';
  secondsInfo = '00';
  curTimeInfo.textContent = `${minutesInfo}:${secondsInfo}`;
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
const correct = document.querySelector('.correct-answer');
const incorrect = document.querySelector('.incorrect-answer');

let questionArray;
let count = 0;
let question;
let correctAnswer;
let isFinished = false;

questionArray = birdsData[count];
let randomNumber = Math.floor(Math.random() * 5);
correctAnswer = questionArray[randomNumber].name;
loadQuestion(questionArray[randomNumber]);
disableNextButton();
loadAnswers(questionArray);
resetBirdInfo();
categoryButtons[count].classList.add('button_active');
infoSection.classList.add('inactive');
count++;

// listens clicks on Next button
nextButton.addEventListener('click', (e) => {
  if(count === 6) {
    nextButton.disabled = true;
    return;
  }
  loadNextQuestion(count);
  disableNextButton(); 
  count++;
  e.preventDefault();
});

// listen clicks on answers
answers.addEventListener('click', (e) => {
  const answersBlock = e.target.parentElement.parentElement;
  if(answersBlock.classList.contains('answers')) {
    const birdName = e.target.textContent;
    if(birdName === correctAnswer && isFinished === false) {
      for(let bird of questionArray) {
        if(bird.name === birdName) {
          showAnswer(bird);
          loadBirdInfo(bird);
        }
      }
      

      e.target.classList.add('correct');
      correct.play();
      isFinished = true;

      let resultScore = countScore();
      let curResult = parseInt(score.textContent);
      score.textContent = curResult + resultScore;

      audioMain.pause();
      enableNextButton();

      if(count === 6) {
        let finalScore = score.textContent;
        localStorage.score = JSON.stringify(finalScore);
        disableNextButton();
        showResultsPage();
      }
    } else {
      if(isFinished === false) {
        e.target.classList.add('wrong');
        for(let bird of questionArray) {
          if(bird.name === e.target.textContent) {
            loadBirdInfo(bird);
            incorrect.play();
            infoSection.classList.remove('inactive');
          }
        }
      } else {
        for(let bird of questionArray) {
          if(bird.name === e.target.textContent) {
            loadBirdInfo(bird);
            infoSection.classList.remove('inactive');
          }
        }
      }
      
    }
  }
})

// loads question to the question block
function loadQuestion(bird) {
  isFinished = false;
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
function loadNextQuestion(count) {
  questionArray = birdsData[count];
  let randomNumber = Math.floor(Math.random() * 5);
  const answersBlock = document.querySelector('.answers');
  if(answersBlock.classList.contains('inactive')) {
    answersBlock.classList.remove('inactive');
  }
  clearIndicators();
  loadQuestion(questionArray[randomNumber]);
  loadAnswers(questionArray);
  resetBirdInfo();
  correctAnswer = questionArray[randomNumber].name;
  categoryButtons[count - 1].classList.remove('button_active');
  categoryButtons[count].classList.add('button_active');
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

// resets bird's info
function resetBirdInfo() {
  const birdImage = document.querySelector('.bird-info__image');
  birdImage.src = '../assets/img/question.png';
  const birdName = document.querySelector('.bird-info__name');
  birdName.textContent = '********';
  const birdSpecies = document.querySelector('.bird-info__species');
  birdSpecies.textContent = '****** ******';
  const description = document.querySelector('.bird-info__description');
  description.textContent = message;
  resetPlayerInfo();
  const birdSound = document.querySelector('.info-player__audio');
  birdSound.src = '#';
  const duration = document.querySelector('.info-time_duration');
  duration.textContent = '00:00';
  infoSection.classList.add('inactive');
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

function getTranslate(lang) {
  const dataForTranslation = document.querySelectorAll('[data-translate]');
  dataForTranslation.forEach((item) => item.textContent = translation[lang][item.dataset.translate]);
}