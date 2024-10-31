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
    // justina sprite animations
    this.anims.create({
      key: "walk-down",
      frameRate: "5",
      repeat: -1,
      frames: this.anims.generateFrameNumbers("justina", {
        start: 1,
        end: 2,
      }),
    });

    this.anims.create({
      key: "walk-up",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("justina", {
        start: 5,
        end: 7,
      }),
    });

    this.anims.create({
      key: "walk-left",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("justina", {
        start: 10,
        end: 11,
      }),
    });

    this.anims.create({
      key: "walk-right",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("justina", {
        start: 12,
        end: 13,
      }),
    });

    this.anims.create({
      key: "idle",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("justina", {
        start: 0,
        end: 0,
      }),
    });

    this.scene.start("menuScene");
  }
}
