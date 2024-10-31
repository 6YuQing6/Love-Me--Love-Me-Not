class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
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

    this.playButton = this.add
      .image(30, 50, "red-flower")
      .setOrigin(0, 0)
      .setInteractive();
    this.instructionButton = this.add
      .image(20, 50, "blue-flower")
      .setOrigin(0, 0)
      .setInteractive();
    this.creditButton = this.add
      .image(10, 50, "purple-flower")
      .setOrigin(0, 0)
      .setInteractive();

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
