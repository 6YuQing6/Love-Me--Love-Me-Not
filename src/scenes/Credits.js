class Credits extends Phaser.Scene {
    constructor() {
      super("creditsScene");
    }

    create() {
      this.add
      .text(
        game.config.width / 2,
        game.config.height / 2,
        "ART: Sunny and Yingting\nCODE: Sunny, Justin, Christina",
        { fontFamily: "After Hours", fontSize: 32 }
      )
      .setOrigin(0.5);

      this.instructionButton = this.add
      .image(-100, 400, "purple-flower")
      .setOrigin(0, 0)
      .setScale(0.5)
      .setInteractive(new Phaser.Geom.Rectangle(300, 100, 230, 500), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
      .on("pointerdown", () => this.scene.start("menuScene"));
    }
    
}