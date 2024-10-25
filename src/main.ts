let config = {
  type: Phaser.AUTO,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 832,
  height: 960,
  zoom: 0.75,
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [],
};

let game = new Phaser.Game(config);

let { width, height } = game.config;
