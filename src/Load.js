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

    // images
    this.load.image("red-flower", "flower-Red.png");
    this.load.image("blue-flower", "flower-Blue.png");
    this.load.image("purple-flower", "flower-Purple.png");

    // sprite sheets
    this.load.spritesheet("justina", "justina-Sheet.png", {
      frameWidth: 20,
      frameHeight: 30,
    });

    this.load.spritesheet("petal-red", "petal-red-Sheet.png", {
      frameWidth: 210,
      frameHeight: 180,
    });

    this.load.spritesheet("petal-blue", "petal-blue-Sheet.png", {
      frameWidth: 210,
      frameHeight: 180,
    });

    this.load.spritesheet("petal-purple", "petal-purple-Sheet.png", {
      frameWidth: 210,
      frameHeight: 180,
    });
  }
  create() {
    this.scene.start("menuScene");
  }
}
