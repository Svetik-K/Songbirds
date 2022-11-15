const audioMain = document.querySelector('.main-player__audio');
const buttonPlayMain = document.querySelector('.main-player__button');

buttonPlayMain.addEventListener('click', () => {
    audioMain.play();
})
