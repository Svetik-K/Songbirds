const resultMessage = document.querySelector('.results-main__text');
const repeatButton = document.querySelector('.button_repeat');
const startButton = document.querySelector('.button_to-start');

let score = JSON.parse(localStorage.score);
showResultsMessage(score);
// results message
function showResultsMessage(score) {
  if(score === 30) {
    resultMessage.textContent = `Вы набрали максимально возможное количество баллов, 30 из 30! Отличный результат!`;
    repeatButton.style.display = 'none';
  }else {
    resultMessage.textContent = `Вы набрали ${score} баллов из 30 возможных!`;
    startButton.style.display = 'none';
  }
}