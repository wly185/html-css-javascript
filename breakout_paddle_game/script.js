const rulesBtn = document.getElementById('rules-btn');
const rules = document.getElementById('rules');
const closeBtn = document.getElementById('close-btn');
/** @type {CanvasRenderingContext2D} */
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
  'canvas'
));
const ctx = canvas.getContext('2d');

//rules

rulesBtn.addEventListener('click', openRules);
function openRules() {
  rules.classList.add('show');
}

closeBtn.addEventListener('click', closeRules);
function closeRules() {
  rules.classList.remove('show');
}

// bricks

const brickRowCount = 9;
const brickColumnCount = 5;

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
// console.log(bricks);

function drawBricks() {
  bricks.forEach((col) =>
    col.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  );
}

//ball

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //canvas collision

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //bricks four sides collision
  bricks.forEach((col) =>
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && //left
          ball.x + ball.size < brick.x + brick.w && //right
          ball.y + ball.size > brick.y && //top
          ball.y - ball.size < brick.y + brick.h //bottom
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    })
  );

  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function showAllBricks() {
  bricks.forEach((col) => {
    col.forEach((brick) => {
      brick.visible = true;
    });
  });
}

//paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
  // console.log(e.key);
  if (e.key === 'ArrowLeft' || e.key === 'Left') {
    paddle.dx = -paddle.speed;
  }
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    paddle.dx = paddle.speed;
  }
}

function keyUp(e) {
  paddle.dx = 0;
}

//score
let score = 0;
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`score:${score}`, canvas.width - 100, 30);
}

function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function update() {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}

update();
