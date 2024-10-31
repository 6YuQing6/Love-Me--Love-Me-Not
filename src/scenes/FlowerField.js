class Field extends Phaser.Scene {
  constructor() {
    super("fieldScene");
  }

  create() {
    this.keys = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 50, 50).setOrigin(0.5, 0.5);

    // debug key listener (assigned to D key)
    this.input.keyboard.on(
      "keydown-D",
      function () {
        this.physics.world.drawDebug = this.physics.world.drawDebug
          ? false
          : true;
        this.physics.world.debugGraphic.clear();
      },
      this
    );
  }

  update() {
    this.playerFSM.step();
  }
}
