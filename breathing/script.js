const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = 'breath in';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'hold';
    setTimeout(() => {
      text.innerText = 'breath out';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

breathAnimation();
