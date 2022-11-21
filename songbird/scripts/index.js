const translation = {
  'ru': {
    'link-main': 'Главная',
    'link-quiz': 'Викторина',
    'link-gallery': 'Галерея',
    'start-quiz': 'Начать викторину'
  },
  'en': {
    'link-main': 'Start',
    'link-quiz': 'Quiz',
    'link-gallery': 'Gallery',
    'start-quiz': 'Start quiz'
  }
}

let language = localStorage.lang || 'ru';
getTranslate(language);

const burgerButton = document.querySelector('.start-header__burger');
const navigationBlock = document.querySelector('.start-header__navigation');
const overlay = document.querySelector('.burger-overlay');

burgerButton.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', closeBurgerMenu);
navigationBlock.addEventListener('click', closeBurgerMenu);

function openBurgerMenu() {
  navigationBlock.classList.toggle('open');
  burgerButton.classList.toggle('opened');
  overlay.classList.toggle('shown');
}

function closeBurgerMenu() {
  navigationBlock.classList.remove('open');
  burgerButton.classList.remove('opened');
  overlay.classList.remove('shown');
}

const engLang = document.querySelector('.en-lang');
const ruLang = document.querySelector('.ru-lang');

engLang.addEventListener('click', (e) => {
  getTranslate('en');
  localStorage.lang = 'en';
  e.preventDefault(); 
});

ruLang.addEventListener('click', (e) => {
  getTranslate('ru');
  localStorage.lang = 'ru';
  e.preventDefault(); 
});

function getTranslate(lang) {
  const dataForTranslation = document.querySelectorAll('[data-translate]');
  dataForTranslation.forEach((item) => item.textContent = translation[lang][item.dataset.translate]);
}