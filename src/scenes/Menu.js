class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // playFlower = this.load.image();
    // instructionFlower = this.load.image();
    // creditFlower = this.load.image();
  }

  create() {
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 3,
        "Love Me, Love Me Not",
        { fontFamily: "After Hours", fontSize: 64 }
      )
      .setOrigin(0.5);

    const playButton = this.add.image();
    playButton.setInteractive();
    const instructionButton = this.add.image();
    instructionButton.setInteractive();
    const creditButton = this.add.image();
    creditButton.setInteractive();

    cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.scene.start("playScene");
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.scene.start("playScene");
    }
  }
}
