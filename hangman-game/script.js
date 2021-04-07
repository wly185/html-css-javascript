const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('pop-up-container');
const notifications = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const popup = document.querySelectorAll('pop-up');

const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];
// select random nth word from array
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
// split,match,join

const letters = `${selectedWord
  .split('')
  .map(
    (letter) =>
      `<span class="letter">
  ${correctLetters.includes(letter) ? letter : ''}
  </span>`
  )
  .join('')}`;

function updateWrongLettersElement() {}
function shownNotification() {
  notifications.classList.add('show');
}

const myMessage = function () {
  // console.log('words', words);
  console.log('selectedWord', selectedWord, typeof selectedWord);
  // console.log('letters', letters);
  // console.log('finalMessage', finalMessage);
  // console.log('wrong', wrongLetters);
};

myMessage();

function displayWord() {
  wordElement.innerHTML = letters;
  // remove new line
  const innerWord = wordElement.innerText.replace(/\n/g, '');
  // console.log(wordElement.innerText, innerWord);
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'congratuations! you won!';
    popup.style.display = 'flex';
  }
  console.log(
    'selected',
    selectedWord,
    'correct',
    correctLetters,
    'wrong',
    wrongLetters,
    'word innerhtml',
    wordElement,
    'letter',
    correctLetters
    // ,
    // 'innerword',
    // innerWord
  );
}

window.addEventListener('keydown', (e) => {
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    // console.log('key code');
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        shownNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        shownNotification();
      }
    }
  }
});

displayWord();
