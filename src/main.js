let config = {
  type: Phaser.AUTO,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 820,
  height: 820,
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
  scene: [Load, Menu, Instructions, Field, Pluck, Credits],
};

let game = new Phaser.Game(config);

let { width, height } = game.config;

let cursors;
