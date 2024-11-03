class Dialog extends Phaser.Scene {
  constructor() {
    super("dialogScene");
  }

  init() {
    this.dialog = [
      `"I don't know, I'm feeling kinda hungry..and this flower is right here"`,
      `"You know I'm starving right, there's no harm in eating it"`,
      `"Why would I pluck it if I didn't want to eat it"`,
      `"The weather's too nice, I need a snack"`,
      `"Stop being annoying"`,
      `"It will wither away anyways"`,
      `"Blue's my favorite color though"`,
      `"I'm too hungry"`,
      `"Nah not feeling it"`,
      `"Nuh uh"`,
      `"Nope"`,
      `"No way"`,
      `"No"`,
    ];
    this.dialogIndex = 0; // Add a counter to keep track of the current dialog index
    this.FADE_TIME = 2000;
  }

  create() {
    const eatText = this.add
      .text(width / 2, height / 8, "Eat?", {
        color: "#FF0000",
        fontSize: "64px",
      })
      .setOrigin(0.5, 0.5);

    const dialogText = this.add
      .text(width / 2, height / 4.5, "", {
        color: "#FFFFFF",
        fontSize: "32px",
        align: "center", // Center align the text
        wordWrap: { width: width - 40 }, // Add word wrap to ensure text stays within screen bounds
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
      this.FADE_TIME = 2000;

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

      // trigger dialog

      dialogText.setVisible(true); // Make the dialog text visible
      dialogText.setText(this.dialog[this.dialogIndex]); // Update the dialog text
      if (this.dialogIndex < this.dialog.length - 1) {
        this.dialogIndex++;
      }

      if (this.dialogTimer) {
        this.dialogTimer.remove(false); // Remove the previous timer if it exists
      }

      this.dialogTimer = this.time.delayedCall(this.FADE_TIME, () => {
        dialogText.setVisible(false);
      });

      if (this.FADE_TIME > 200) {
        this.FADE_TIME -= 100;
      }

      // make the screen flash red for a second
      const flash = this.add
        .rectangle(0, 0, width, height, 0xff0000, 0.2)
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
