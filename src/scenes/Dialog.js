class Dialog extends Phaser.Scene {
  constructor() {
    super("dialogScene");
  }

  create() {
    const eatText = this.add
      .text(width / 2, height / 8, "Eat?", {
        color: "#FF0000",
        fontSize: "64px",
      })
      .setOrigin(0.5, 0.5);

    const yesButton = this.add
      .rectangle(width / 4, (height / 4) * 3, width / 4, height / 6, 0xffffff)
      .setInteractive();
    const yesButtonText = this.add
      .text(width / 4, (height / 4) * 3, "Yes", {
        color: "#FF0000",
        fontSize: "32px",
      })
      .setOrigin(0.5);

    yesButton.on("pointerdown", () => {
      // play nomnom
      this.scene.resume("pluckScene");
      this.scene.stop();

      // go back to pluck scene
      // stop dialog
    });

    const noButton = this.add
      .rectangle(
        (width / 4) * 3,
        (height / 4) * 3,
        width / 4,
        height / 6,
        0xffffff
      )
      .setInteractive();
    const noButtonText = this.add
      .text((width / 4) * 3, (height / 4) * 3, "No", {
        color: "#FF0000",
        fontSize: "32px",
      })
      .setOrigin(0.5);

    noButton.on("pointerdown", () => {
      // play error sound
      // make the screen flash red for a second
      const flash = this.add
        .rectangle(0, 0, width, height, 0xff0000, 0.5)
        .setOrigin(0, 0);
      this.tweens.add({
        targets: flash,
        alpha: 0,
        duration: 1000,
        onComplete: () => {
          flash.destroy();
        },
      });
    });
  }
}
