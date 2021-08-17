import { io } from 'socket.io-client';
import './assets/style/index.scss';

import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

window.addEventListener('load', () => {
  const socket = io('https://jsprochat.herokuapp.com');

  const startGame = document.querySelector('.start-game');
  const nameForm = document.getElementById('nameForm');
  const playerName = nameForm.querySelector('.input');
  const warningMessage = document.querySelector('.warning');

  const chat = document.querySelector('.chat-wrap');
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const message = document.querySelector('.message');

  let myId = null;

  const submitName = (event) => {
    event.preventDefault();

    if (playerName.value.length > 15) {
      warningMessage.style.opacity = '1';

      setTimeout(() => {
        warningMessage.style.opacity = '0';
      }, 2500);
      return;
    }

    ClientGame.init({ tagId: 'game', playerName: playerName.value });

    socket.emit('start', playerName.value);

    chat.style.display = 'block';
    nameForm.removeEventListener('submit', submitName);
    startGame.remove();
  };

  nameForm.addEventListener('submit', submitName);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    if (!myId) {
      myId = data.msg.split(' ')[0] === playerName.value ? data.id : null;
    }

    message.insertAdjacentHTML(
      'beforeend',
      `<p style="color: green"><strong>${getTime(data.time)}</strong> ${data.msg}</p>`,
    );
  });

  socket.on('chat disconnect', (data) => {
    message.insertAdjacentHTML(
      'beforeend',
      `<p style="color: red"><strong>${getTime(data.time)}</strong> -  ${data.msg}</p>`,
    );
  });

  socket.on('chat online', (data) => {
    message.insertAdjacentHTML(
      'beforeend',
      `<p><strong>На текущий момент в чате</strong> -  ${data.online} человек</p>`,
    );
  });

  socket.on('chat message', (data) => {
    message.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)}</strong> - <strong style=${myId === data.id ? 'color:blue' : 'color:purple'}>${
        data.name
      }:</strong>  ${data.msg}</p>`,
    );
  });
});
