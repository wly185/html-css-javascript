/** @type {CanvasRenderingContext2D} */
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  'canvas'
));
const ctx = canvas.getContext('2d');

//shift alt a for block comments

// start x,y, width, height
/* ctx.fillStyle = 'red';
ctx.fillRect(20, 20, 150, 100);
ctx.fillStyle = 'blue';
ctx.fillRect(200, 20, 150, 100);

ctx.lineWidth = 5;
ctx.strokeStyle = 'green';
ctx.strokeRect(100, 200, 150, 100); */

// clearRect();
/*ctx.clearRect(25, 25, 140, 90);

ctx.font = '30px Arial';
ctx.fillStyle = 'purple';
ctx.fillText('hello world', 400, 50);

ctx.lineWidth = 1;
ctx.strokeStyle = 'orange';
ctx.strokeText('hello world', 400, 100);*/

/* ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 200);
ctx.lineTo(50, 50);
ctx.closePath();
// line to beginning
ctx.fillStyle = 'coral';
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(150, 200);
ctx.lineTo(250, 200);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.rect(300, 50, 150, 100);
ctx.fillStyle = 'teal';
ctx.fill(); */

/* ctx.beginPath();
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

ctx.moveTo(centerX + 100, centerY);
ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

ctx.moveTo(centerX - 60, centerY - 80);
ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);

ctx.moveTo(centerX + 100, centerY - 80);
ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

ctx.stroke();
 */

/* const circle = {
  x: 200,
  y: 200,
  size: 30,
  dx: 5,
  dy: 4
};

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = 'purple';
  ctx.fill();
}

// console.log(drawCircle());

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();

  circle.x += circle.dx;
  circle.y += circle.dy;

  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1; //-circle.dx
  }

  if (circle.y + circle.size > canvas.width || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  requestAnimationFrame(update);
  // console.log(123);
}

update(); */

const image = document.getElementById('source');

const player = {
  w: 50,
  h: 70,
  x: 20,
  y: 200,
  speed: 5,
  dx: 0,
  dy: 0
};

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function newPos() {
  player.x += player.dx;
  player.y += player.dy;

  detectWalls();
}

function detectWalls() {
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
  }
}
function update() {
  clear();
  drawPlayer();
  newPos();
  requestAnimationFrame(update);
}

update();

function keydown(e) {
  // console.log(e.key);
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    moveRight();
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    moveLeft();
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    moveUp();
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    moveDown();
  }
}
function keyup(e) {
  if (
    e.key === 'ArrowRight' ||
    'Right' ||
    'ArrowLeft' ||
    'Left' ||
    'ArrowUp' ||
    'Up' ||
    'ArrowDown' ||
    'Down'
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

function moveUp() {
  player.dy = -player.speed;
}
function moveDown() {
  player.dy = player.speed;
}
function moveLeft() {
  player.dx = -player.speed;
}
function moveRight() {
  player.dx = player.speed;
}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

// document.addEventListener('keydown', (e) => console.log(e.key));
