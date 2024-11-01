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
      .image(-225, 150, "red-flower")
      .setOrigin(0, 0)
      .setInteractive(new Phaser.Geom.Rectangle(250, 100, 230, 500), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
      .on("pointerdown", () => this.scene.start("fieldScene"));

      this.add.text(100, 435, "PLAY",
        { fontFamily: "After Hours", fontSize: 50 }).setOrigin(0, 0).setColor('black')

    this.instructionButton = this.add
      .image(-25, 120, "blue-flower")
      .setOrigin(0, 0)
      .setInteractive(new Phaser.Geom.Rectangle(300, 100, 230, 500), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
      .on("pointerdown", () => this.scene.start("instructionsScene"));

      this.add.text(340, 420, "HOW2\nPLAY",
        { fontFamily: "After Hours", fontSize: 50 }).setOrigin(0, 0).setColor('black')

    this.creditButton = this.add
      .image(255, 145, "purple-flower")
      .setOrigin(0, 0)
      .setInteractive(new Phaser.Geom.Rectangle(310, 100, 230, 500), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
      .on("pointerdown", () => this.scene.start("creditsScene"));

            this.add.text(560, 435, "CREDITS",
        { fontFamily: "After Hours", fontSize: 50 }).setOrigin(0, 0).setColor('black')

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
      this.scene.start("fieldScene");
    }
  }
}
