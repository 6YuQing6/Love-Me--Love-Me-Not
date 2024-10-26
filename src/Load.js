class Load extends Phaser.Scene {
  constructor() {
    super("loadScene");
  }

  preload() {
    // loading bar
    // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
    let loadingBar = this.add.graphics();
    this.load.on("progress", (value) => {
      loadingBar.clear(); // reset fill/line style
      loadingBar.fillStyle(0xffffff, 1); // (color, alpha)
      loadingBar.fillRect(
        0,
        Number(game.config.width) / 2,
        Number(game.config.width) * value,
        5
      ); // (x, y, w, h)
    });
    this.load.on("complete", () => {
      loadingBar.destroy();
    });

    this.load.path = "./assets/";
    // loads stuff here
  }
  create() {
    this.scene.start("menuScene");
  }
}
