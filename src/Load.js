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

    this.load.spritesheet("human-flower", "human-flower.png", {
      frameWidth: 20,
      frameHeight: 32,
    });
  }
  create() {
    // Generate frame numbers for the human-flower sprite sheet
    const frames = this.anims.generateFrameNumbers("human-flower", {
      start: 0,
      end: -1, // -1 means all frames
    });

    // Log the frames to the console
    console.log(frames);
    // red human flower animation

    this.anims.create({
      key: "red-flower-idle",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 0,
        end: 0,
      }),
    });

    this.anims.create({
      key: "red-flower-walk-down",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 1,
        end: 2,
      }),
    });

    this.anims.create({
      key: "red-flower-walk-up",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 4,
        end: 6,
      }),
    });

    this.anims.create({
      key: "red-flower-walk-left",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 8,
        end: 9,
      }),
    });

    this.anims.create({
      key: "red-flower-walk-right",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 10,
        end: 11,
      }),
    });

    // blue sprite anims
    this.anims.create({
      key: "blue-flower-idle",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 12,
        end: 12,
      }),
    });

    // blue sprite anims
    this.anims.create({
      key: "blue-flower-walk-down",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 12,
        end: 14,
      }),
    });

    this.anims.create({
      key: "blue-flower-walk-up",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 16,
        end: 18,
      }),
    });

    this.anims.create({
      key: "blue-flower-walk-left",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 20,
        end: 21,
      }),
    });

    this.anims.create({
      key: "blue-flower-walk-right",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 22,
        end: 23,
      }),
    });

    // purple sprite anims
    this.anims.create({
      key: "purple-flower-idle",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 24,
        end: 24,
      }),
    });

    this.anims.create({
      key: "purple-flower-walk-down",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 24,
        end: 26,
      }),
    });

    this.anims.create({
      key: "purple-flower-walk-up",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 28,
        end: 30,
      }),
    });

    this.anims.create({
      key: "purple-flower-walk-left",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 32,
        end: 33,
      }),
    });

    this.anims.create({
      key: "purple-flower-walk-right",
      frameRate: 5,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("human-flower", {
        start: 34,
        end: 35,
      }),
    });

    // justina sprite animations
    this.anims.create({
      key: "walk-down",
      frameRate: 5,
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
