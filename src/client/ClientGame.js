import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
    this.player.playerName = this.cfg.playerName;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.world;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();

      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.world.render(time);
      });

      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    const movePlayer = (keydown, x, y) => {
      if (this.player && this.player.motionProgress === 1) {
        const canMovie = this.player.moveByCellCoord(x, y, (cell) => cell.findObjectsByType('grass').length);

        if (canMovie) {
          this.player.setState(keydown);
          this.player.once('motion-stopped', () => this.player.setState('main'));
        }
      }
    };

    this.engine.input.onKey({
      ArrowLeft: () => {
        movePlayer('left', -1, 0);
      },
      ArrowRight: () => {
        movePlayer('right', 1, 0);
      },
      ArrowUp: () => {
        movePlayer('up', 0, -1);
      },
      ArrowDown: () => {
        movePlayer('down', 0, 1);
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
