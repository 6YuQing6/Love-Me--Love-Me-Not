class FlowerPerson extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, color, player) {
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
    this.player = player; // Reference to the player
  }

  update() {
    const { left, right, up, down } = this.scene.keys;

    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.runAwayFromPlayer();
    } else {
      this.idle();
    }
  }

  idle() {
    // this.setVelocity(0);
    // this.anims.play(`${this.color}-idle`);
  }

  runAwayFromPlayer() {
    // Calculate direction away from player
    const awayDirection = new Phaser.Math.Vector2(
      this.x - this.player.x,
      this.y - this.player.y
    ).normalize();

    // Add some randomness
    awayDirection.x += Phaser.Math.FloatBetween(-0.5, 0.5);
    awayDirection.y += Phaser.Math.FloatBetween(-0.5, 0.5);
    awayDirection.normalize();

    // Set velocity in the randomized direction away from player
    this.setVelocity(
      this.flowerVelocity * awayDirection.x,
      this.flowerVelocity * awayDirection.y
    );

    // Determine the animation direction based on movement vector
    if (Math.abs(awayDirection.x) > Math.abs(awayDirection.y)) {
      this.direction = awayDirection.x > 0 ? "right" : "left";
    } else {
      this.direction = awayDirection.y > 0 ? "down" : "up";
    }

    // this.anims.play(`${this.color}-walk-${this.direction}`, true);
  }
}