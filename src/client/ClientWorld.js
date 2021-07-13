class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    this.levelCfg.map.forEach((cfgRow, pY) => {
      cfgRow.forEach((cfgCell, pX) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: pX,
          y: pY,
          w: 48,
          h: 48,
        });
      });
    });
  }
}

export default ClientWorld;
