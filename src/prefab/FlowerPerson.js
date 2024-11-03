class FlowerPerson extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, color) {
    super(scene, x, y, "human-flower");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(3);
    this.body.setSize(this.width / 2, this.height / 2);
    this.setCollideWorldBounds(true);

    this.color = color;

    this.direction = "down";
    this.flowerVelocity = 200;

    this.isMoving = false;
  }

  update() {
    const { left, right, up, down } = this.scene.keys;

    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.run();
    } else {
      this.idle();
    }
  }

  idle() {
    this.setVelocity(0);
    this.anims.play(`${this.color}-idle`);
  }

  run() {
    const { left, right, up, down } = this.scene.keys;

    let moveDirection = new Phaser.Math.Vector2(0, 0);
    if (up.isDown) {
      moveDirection.y = -1;
      this.direction = "up";
    } else if (down.isDown) {
      moveDirection.y = 1;
      this.direction = "down";
    }
    if (left.isDown) {
      moveDirection.x = -1;
      this.direction = "left";
    } else if (right.isDown) {
      moveDirection.x = 1;
      this.direction = "right";
    }

    moveDirection.normalize();
    this.setVelocity(
      this.flowerVelocity * moveDirection.x,
      this.flowerVelocity * moveDirection.y
    );
    this.anims.play(`${this.color}-walk-${this.direction}`, true);
  }
}
