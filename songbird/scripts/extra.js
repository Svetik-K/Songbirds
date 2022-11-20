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