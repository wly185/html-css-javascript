const wordEl = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtnEl = document.getElementById('settings-btn');
const settingsEl = document.getElementById('settings');
const settingsFormEl = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const closeWindowBtn = document.getElementById('close-window-btn');

// list of words for games
// https://dostring.com/random-word-generator

const words = [
  'symbolic',
  'zebra',
  'grease',
  'prime',
  'approximation',
  'paste',
  'clever',
  'cybernetic',
  'blast',
  'essential',
  'felon',
  'brutish',
  'eraser',
  'foreign',
  'doubtless',
  'accuracy',
  'doll',
  'war',
  'cellblock',
  'beard'
];

let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'easy';

textEl.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordDOM() {
  randomWord = getRandomWord();
  wordEl.innerHTML = randomWord;
}

addWordDOM();

textEl.addEventListener('input', insertedText);

function insertedText(e) {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordDOM();
    updateScore();
    e.target.value = '';
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
}

settingsBtnEl.addEventListener('click', showHideSettings);

function showHideSettings() {
  settings.classList.toggle('hide');
}

settingsFormEl.addEventListener('change', chooseDifficulty);
function chooseDifficulty(e) {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endgameEl.innerHTML = `<h1>time ran out</h1><p>your final score is ${score}</p><button onclick="reloadPage()">reload</button><button  onclick="closeWindow()">dismiss</button>`;
  endgameEl.style.display = 'flex';
}

// closeWindowBtn.addEventListener('click', closeWindow);

function closeWindow() {
  endgameEl.style.display = 'none';
}
function reloadPage() {
  window.location.reload();
}
