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
  }
}
