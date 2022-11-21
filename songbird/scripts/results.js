const translation = {
  'ru': {
    'congrats': 'Поздравляем!',
    'button-repeat': 'Сыграть еще раз',
    'button-to-start': 'Вернуться на главную'
  },
  'en': {
    'congrats': 'Congratulations!',
    'button-repeat': 'Play again',
    'button-to-start': 'Return to start'
  }
}

let message;
let winMessage;

let score = JSON.parse(localStorage.score);
const language = localStorage.lang || 'ru';
getTranslate(language);
if(language === 'en') {
  message = `You've got the maximum possible number of points, 30 out of 30! Excellent result!`;
  winMessage = `You've got ${score} scores out of 30 possible!`;
}
else if(language === 'ru') {
  message = `Вы набрали максимально возможное количество баллов, 30 из 30! Отличный результат!`;
  winMessage = `Вы набрали ${score} баллов из 30 возможных!`;
}

const resultMessage = document.querySelector('.results-main__text');
const repeatButton = document.querySelector('.button_repeat');
const startButton = document.querySelector('.button_to-start');


showResultsMessage(score);
// results message
function showResultsMessage(score) {
  if(score === 30) {
    resultMessage.textContent = message;
    repeatButton.style.display = 'none';
  }else {
    resultMessage.textContent = winMessage;
    startButton.style.display = 'none';
  }
}

function getTranslate(lang) {
  const dataForTranslation = document.querySelectorAll('[data-translate]');
  dataForTranslation.forEach((item) => item.textContent = translation[lang][item.dataset.translate]);
}