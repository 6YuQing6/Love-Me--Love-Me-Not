class Field extends Phaser.Scene {
  constructor() {
    super("fieldScene");
  }

  init() {
    this.NUM_FLOWERS = 10;
    this.REGROW_TIME = 3000;
  }

  create() {
    // background
    this.cameras.main.setBackgroundColor("#78ac63");

    this.keys = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 50, 50).setOrigin(0.5, 0.5);

    // adds flowers
    this.flowerGroup = this.add.group({
      runChildUpdate: true,
    });
    for (let i = 0; i < this.NUM_FLOWERS; i++) {
      this.addFlower();
    }

    this.flowerPeopleGroup = this.add.group({
      runChildUpdate: true,
    });
  }

  update() {
    this.playerFSM.step();

    // player touching flower logic
    this.physics.overlap(this.player, this.flowerGroup, (player, flower) => {
      flower.destroy();
      this.scene.pause("fieldScene");
      this.scene.launch("pluckScene");
      this.time.delayedCall(this.REGROW_TIME, () => {
        this.addFlowerPerson();
      });
    });

    // player touching flower people logic
    this.physics.overlap(
      this.player,
      this.flowerPeopleGroup,
      (player, flower) => {
        flower.destroy();
        this.scene.pause("fieldScene");
        this.scene.launch("pluckScene");
        this.time.delayedCall(this.REGROW_TIME, () => {
          this.addFlowerPerson();
        });
      }
    );
  }

  randomFlowerTexture() {
    const textures = ["red-flower", "purple-flower", "blue-flower"];
    return textures[Math.floor(Math.random() * textures.length)];
  }

  // create new flowers and add them to existing flower group
  addFlower() {
    const texture = this.randomFlowerTexture();
    const x = Math.random() * (width - padding) + padding;
    const y = Math.random() * (height - padding) + padding;
    const flower = new Flower(this, x, y, texture).setVisible(true);
    this.flowerGroup.add(flower);
  }

  addFlowerPerson() {
    const texture = this.randomFlowerTexture();
    const x = Math.random() * (width - padding) + padding;
    const y = Math.random() * (height - padding) + padding;
    const flower = new FlowerPerson(this, x, y, texture).setVisible(true);
    this.flowerPeopleGroup.add(flower);
  }
}
