import './assets/style/index.scss';

import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const startGame = document.querySelector('.start-game');
  const nameForm = document.getElementById('nameForm');
  const playerName = nameForm.querySelector('.input');
  const warningMessage = document.querySelector('.warning');

  nameForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (playerName.value.length > 15) {
      warningMessage.style.opacity = '1';

      setTimeout(() => {
        warningMessage.style.opacity = '0';
      }, 2500);
      return;
    }

    startGame.parentNode.removeChild(startGame);

    ClientGame.init({ tagId: 'game', playerName: playerName.value });
  });
});
