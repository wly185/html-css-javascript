const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-card-container');
const deleteBtn = document.getElementById('delete-btn');

//create your cards
const cardsEl = [];
let activeCardIndex = 0;
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

const cardsData = getCardsLocalStorage();

function getCardsLocalStorage() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null
    ? [{ question: 'create a card!', answer: 'answers at the back' }]
    : cards;
}

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
createCards();

function createCard(data, index) {
  // console.log(data, index);
  const card = document.createElement('div');
  card.classList.add('card');
  if (index === 0) {
    card.classList.add('active');
  }
  card.innerHTML = `<div class="inner-card">
<div class="inner-card-front">
  <p>${data.question}</p>
</div>
<div class="inner-card-back">
  <p>${data.answer}</p>
</div>
</div>`;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  // console.log(card);
  // console.log(cardsContainer);

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

//goto prev or next card

function updateCurrentText() {
  currentEl.innerText = `${activeCardIndex + 1}/${cardsEl.length}`;
}

nextBtn.addEventListener('click', nextCard);

function nextCard() {
  cardsEl[activeCardIndex].className = 'card left';
  activeCardIndex = activeCardIndex + 1;
  if (activeCardIndex > cardsEl.length - 1) {
    activeCardIndex = cardsEl.length - 1;
  }

  cardsEl[activeCardIndex].className = 'card active';
  updateCurrentText();
}

// like not very DRY
prevBtn.addEventListener('click', prevCard);

function prevCard() {
  // override
  // not card prev
  cardsEl[activeCardIndex].className = 'card left';
  activeCardIndex = activeCardIndex - 1;
  if (activeCardIndex < 0) {
    activeCardIndex = 0;
  }

  cardsEl[activeCardIndex].className = 'card active';
  updateCurrentText();
}

//create a card
showBtn.addEventListener('click', showAddCardContainer);
function showAddCardContainer() {
  addContainer.classList.add('show');
}

hideBtn.addEventListener('click', hideAddCardContainer);
function hideAddCardContainer() {
  addContainer.classList.remove('show');
}

addCardBtn.addEventListener('click', addCard);

function addCard() {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    cardsData.push({ question, answer });
    localStorage.setItem('cards', JSON.stringify(cardsData));

    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');

    createCards();
    window.location.reload();
  }
}

//delete all cards

clearBtn.addEventListener('click', deleteCards);
function deleteCards() {
  localStorage.removeItem('cards');
  getCardsLocalStorage();

  createCards();
  window.location.reload();
}

deleteBtn.addEventListener('click', deleteCard);

function deleteCard() {
  cardsData.splice(activeCardIndex, 1);
  localStorage.setItem('cards', JSON.stringify(cardsData));
  window.location.reload();
}
