import { birdsData } from './birds.js';

const audioMain = document.querySelector('.main-player__audio');
const buttonPlayMain = document.querySelector('.main-player__button');

buttonPlayMain.addEventListener('click', () => {
  audioMain.play();
})


// Quiz logic
const categories = document.querySelector('.questions');
const categoryButtons = document.querySelectorAll('.questions__button');
const answers = document.querySelector('.answers');
const answersButtons = document.querySelectorAll('.answers__button');
const nextButton = document.querySelector('.quiz-footer__button');

let categoryArray;
let correctAnswer;
let attemptCounter;
let question;
let currentId;


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

    categoryArray = returnCategory(birdsData, categoryName); // returns an array from birdsData
    const shuffledArr = categoryArray.sort((a, b) => 0.5 - Math.random()); // shuffles initial array
    loadQuestion(shuffledArr[0]); // loads first index in shuffled array
    question = shuffledArr[0]; // the first question now is the first item in shuffled array
    correctAnswer = shuffledArr[0].name;
    currentId = 0; // id === 0, will be increased with next question loaded
    loadAnswers(categoryArray); // loads birds names into answers buttons
  }
})

// listen clicks on answers
answers.addEventListener('click', (e) => {
  const answersBlock = e.target.parentElement.parentElement;
  if(answersBlock.classList.contains('answers')) {
    const birdName = e.target.textContent;
    if(birdName === correctAnswer) {
      showAnswer(question);
      // TODO: add green indicator to button
      audioMain.pause();
      attemptCounter = 0;
    } else {
      // TODO: add red indicator to button
      // handle attempts
    }
  }
})

nextButton.addEventListener('click', loadNextQuestion);

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
  const questionImage = document.querySelector('.question__image');
  questionImage.src = '../assets/img/question.png';
  const birdName = document.querySelector('.question__bird-name');
  birdName.textContent = '********';
  const birdSound = document.querySelector('.main-player__audio');
  birdSound.src = bird.audio;
}

// load answers variants
function loadAnswers(categoryArray) {
  const shuffledArray = categoryArray.sort((a, b) => 0.5 - Math.random());
  answersButtons.forEach((button, index) => {
    button.textContent = categoryArray[index].name;
  }) 
}

// shows answer in the question block
function showAnswer(bird) {
  const questionImage = document.querySelector('.question__image');
  questionImage.src = bird.image;
  const birdName = document.querySelector('.question__bird-name');
  birdName.textContent = bird.name;
}

function loadNextQuestion() {

}

function handleAttempts() {

}
