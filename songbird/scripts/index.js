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