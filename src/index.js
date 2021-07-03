import './assets/style/index.scss';

import Arthas from './assets/img/Male-3-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const widthArea = canvas.clientWidth;
const heightArea = canvas.clientHeight;

const spriteW = 48;
const spriteH = 48;

const step = 10;

const shots = 3;
let cycle = 0;

let bottomPressed = false;
let upPressed = false;
let rightPressed = false;
let leftPressed = false;

let pX = widthArea / 2 - spriteW / 2;
let pY = heightArea / 2 - spriteH / 2;

let direction = 0;

const buttonState = (key, pressed) => {
  switch (key) {
    case 'Down':
    case 'ArrowDown':
      bottomPressed = pressed;
      break;
    case 'Up':
    case 'ArrowUp':
      upPressed = pressed;
      break;
    case 'Left':
    case 'ArrowLeft':
      leftPressed = pressed;
      break;
    case 'Right':
    case 'ArrowRight':
      rightPressed = pressed;
      break;
    default:
      break;
  }
};

const keyDownHandler = (e) => {
  buttonState(e.key, true);
};

const keyUpHandler = (e) => {
  buttonState(e.key, false);
};

const changeCycle = () => {
  cycle = (cycle + 1) % shots;
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Arthas;

const getPosition = (newPosition) => {
  if (newPosition < 0) {
    return 0;
  }

  if (newPosition + 48 > 600) {
    return newPosition - step;
  }

  return newPosition;
};

const changeDirection = (newDirection) => {
  direction = direction !== newDirection ? newDirection : direction;
};

const changePosition = () => {
  if (bottomPressed) {
    pY = getPosition(pY + step);

    changeDirection(0);
    changeCycle();
  }

  if (upPressed) {
    pY = getPosition(pY - step);

    changeDirection(144);
    changeCycle();
  }

  if (rightPressed) {
    pX = getPosition(pX + step);

    changeDirection(96);
    changeCycle();
  }

  if (leftPressed) {
    pX = getPosition(pX - step);

    changeDirection(48);
    changeCycle();
  }
};

const drawGross = () => {
  ctx.fillStyle = '#257a10';
  ctx.fillRect(0, 0, 600, 600);
};

const drawRoad = () => {
  ctx.fillStyle = '#ab790c';
  ctx.fillRect(0, 20, 600, 100);
  ctx.fillRect(200, 100, 200, 600);

  ctx.strokeStyle = '#89857D';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(600, 20);

  ctx.moveTo(0, 120);
  ctx.lineTo(200, 120);

  ctx.moveTo(200, 120);
  ctx.lineTo(200, 600);

  ctx.moveTo(400, 120);
  ctx.lineTo(600, 120);

  ctx.moveTo(400, 120);
  ctx.lineTo(400, 600);

  ctx.stroke();
};

const renderTree = (startX, startY) => {
  ctx.fillStyle = '#5E4107';
  ctx.fillRect(startX, startY, 15, 75);

  ctx.beginPath();
  ctx.fillStyle = '#032C06';
  ctx.lineWidth = 5;

  ctx.moveTo(startX, startY + 25);
  ctx.quadraticCurveTo(startX - 50, startY + 15, startX - 20, startY);
  ctx.quadraticCurveTo(startX - 50, startY - 25, startX + 7, startY - 25);
  ctx.quadraticCurveTo(startX + 50, startY - 25, startX + 35, startY);
  ctx.quadraticCurveTo(startX + 50, startY + 15, startX + 15, startY + 25);

  ctx.fill();
};

const drawTree = () => {
  renderTree(150, 150);
  renderTree(450, 150);
  renderTree(150, 300);
  renderTree(450, 300);
  renderTree(150, 450);
  renderTree(450, 450);
  renderTree(75, 225);
  renderTree(75, 225 + 150);
  renderTree(525, 225);
  renderTree(525, 225 + 150);
};

const drawBorderWater = () => {
  ctx.fillStyle = '#49D2DF';
  ctx.fillRect(0, 0, 600, 5);
  ctx.fillRect(0, 0, 5, 600);
  ctx.fillRect(0, 595, 600, 5);
  ctx.fillRect(595, 0, 595, 600);
};

const drawBackground = () => {
  drawGross();
  drawBorderWater();
  drawRoad();
  drawTree();
};

img.addEventListener('load', () => {
  setInterval(() => {
    changePosition();

    ctx.clearRect(0, 0, 600, 600);

    drawBackground();

    ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
