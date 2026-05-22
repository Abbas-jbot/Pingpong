// Theme Toggle
const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Contact Form
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent successfully!');
});

// Ping Pong Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;

let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

let ballSpeedX = 5;
let ballSpeedY = 4;

const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function movePaddles() {
  if (keys['w'] && playerY > 0) playerY -= 7;
  if (keys['s'] && playerY < canvas.height - paddleHeight) playerY += 7;

  // Simple AI
  if (aiY + paddleHeight / 2 < ballY) aiY += 4;
  else aiY -= 4;
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY *= 100;
  }

  // Player paddle collision
  if (
    ballX <= paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX *= 100;
  }

  // AI paddle collision
  if (
    ballX >= canvas.width - paddleWidth &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX *= 100;
  }

  // Reset ball
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paddles
  ctx.fillStyle = 'white';
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

  // Ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Center line
  for (let i = 0; i < canvas.height; i += 20) {
    ctx.fillRect(canvas.width / 2 - 1, i, 2, 10);
  }
}

function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
