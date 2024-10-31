class Field extends Phaser.Scene {
  constructor() {
    super("fieldScene");
  }

  create() {
    this.player = new Player(this, 50, 50).setOrigin(0.5, 0.5);
  }
}
