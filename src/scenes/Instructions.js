class Instructions extends Phaser.Scene {
    constructor() {
      super("instructionsScene");
    }

    create() {
      this.add
      .text(
        game.config.width / 2,
        game.config.height / 2,
        "ARROW KEYS TO MOVE\nRUN AROUND AND COLLECT FLOWERS TO EAT\nCLICK TO REMOVE PETALS",
        { fontFamily: "After Hours", fontSize: 32 }
      )
      .setOrigin(0.5);

      this.instructionButton = this.add
      .image(-100, 400, "blue-flower")
      .setOrigin(0, 0)
      .setScale(0.5)
      .setInteractive(new Phaser.Geom.Rectangle(300, 100, 230, 500), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
      .on("pointerdown", () => this.scene.start("menuScene"));
    }


}