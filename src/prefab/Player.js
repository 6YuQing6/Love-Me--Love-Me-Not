class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "justina");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(this.width / 2, this.height / 2);
    this.setScale(3.5);
    this.setCollideWorldBounds(true);

    this.direction = "down";
    this.playerVelocity = 300;

    scene.playerFSM = new StateMachine(
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
  enter(scene, player) {
    player.setVelocity(0);
    player.anims.play("idle");
  }

  execute(scene, player) {
    const { left, right, up, down } = scene.keys;

    // transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition("walk");
      return;
    }
  }
}

class WalkState extends State {
  execute(scene, player) {
    const { left, right, up, down } = scene.keys;

    // transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition("idle");
      return;
    }

    // handle movement
    let moveDirection = new Phaser.Math.Vector2(0, 0);
    if (up.isDown) {
      moveDirection.y = -1;
      player.direction = "up";
    } else if (down.isDown) {
      moveDirection.y = 1;
      player.direction = "down";
    }
    if (left.isDown) {
      moveDirection.x = -1;
      player.direction = "left";
    } else if (right.isDown) {
      moveDirection.x = 1;
      player.direction = "right";
    }
    // normalize movement vector, update player position, and play proper animation
    moveDirection.normalize();
    player.setVelocity(
      player.playerVelocity * moveDirection.x,
      player.playerVelocity * moveDirection.y
    );
    player.anims.play(`walk-${player.direction}`, true);
  }

  updateVelocity(speed) {
    this.playerVelocity = speed;
  }
}
