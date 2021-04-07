// about.config flag for speech recognition api in other browsers
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

const msgEl = document.getElementById('msg');

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('number', randomNum);

//recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

function listen() {
  recognition = new window.SpeechRecognition();
  recognition.start();
  recognition.addEventListener('result', onSpeak);
}

listen();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  // console.log(e);
  // console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
  recognition.stop();
  listen();
}

function writeMessage(msg) {
  msgEl.innerHTML = `<div>you said: <span class="box">${msg}</span></div>`;
}

function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>that is not a valid number</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML = `<div>number must be between 1 and 100</div>`;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `<h2>congrats you have guessed the number <br/>it was ${num}</h2><button class="play-again" id="play-again">play again</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>go lower</div>`;
    return;
  } else {
    msgEl.innerHTML += `<div>go higher</div>`;
    return;
  }
}

document.body.addEventListener('click', restart);

function restart(e) {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
}
