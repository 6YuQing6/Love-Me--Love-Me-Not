class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "justina");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // this.body.setSize(this.width / 2, this.height / 2);
    // this.body.setOffset(this.width / 4, this.height / 3);
    this.setCollideWorldBounds(true);

    scene.frogFSM = new StateMachine(
      "idle",
      {
        idle: new IdleState(),
        walk: new WalkState(),
      },
      [scene, this]
    );
  }
}

class IdleState extends State {
  enter(scene, player) {}

  execute(scene, player) {
    // Empty function body
  }
}

class WalkState extends State {
  enter(scene, player) {
    // Empty function body
  }

  execute(scene, player) {
    // Empty function body
  }
}
