const audioMain = document.querySelector('.question__audio');
const buttonPlayMain = document.querySelector('.main-player__button');

buttonPlayMain.addEventListener('click', () => {
    audioMain.play();
})
