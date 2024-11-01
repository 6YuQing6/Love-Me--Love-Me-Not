class Pluck extends Phaser.Scene {
  constructor() {
    super("pluckScene");
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();
    let graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(
      this.cameras.main.width / 4,
      this.cameras.main.height / 4,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.scene.resume("fieldScene");
      this.scene.stop();
    }
  }
}
