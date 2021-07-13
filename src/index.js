import './assets/style/index.scss';

import ClientGame from './client/ClientGame';

import Arthas from './assets/img/Male-3-Walk.png';

const canvas = document.getElementById('game');

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

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
  changePosition();
});
