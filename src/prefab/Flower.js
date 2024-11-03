class Flower extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.2);
    this.body.setSize(this.width / 2, this.height / 2);
  }

  create() {
    console.log(this.x, this.y);
    this.run("down");
  }

  // function to make flower run in specific direction
  run(direction) {
    let moveDirection = new Phaser.Math.Vector2(0, 0);
    this.direction = direction;
    if (this.direction == "up") {
      moveDirection.y = -1;
    } else if (this.direction == "down") {
      moveDirection.y = 1;
    }
    if (this.direction == "left") {
      moveDirection.x = -1;
    } else if (this.direciton == "right") {
      moveDirection.x = 1;
    }
    // normalize movement vector, update player position, and play proper animation
    moveDirection.normalize();
    this.setVelocity(
      this.flowerVelocity * moveDirection.x,
      this.flowerVelocity * moveDirection.y
    );
    this.anims.play(`${this.texture}-walk-${this.direction}`, true);
  }
}
