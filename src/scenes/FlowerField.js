class Field extends Phaser.Scene {
  constructor() {
    super("fieldScene");
  }

  init() {
    this.NUM_FLOWERS = 5;
    this.REGROW_TIME = 3000;
    this.currentBackgroundColor = 0x9ac18a; // initial background color
  }

  create() {
    // background
    this.cameras.main.setBackgroundColor(this.currentBackgroundColor);

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
      this.registry.set('texturecoll', flower.texture)
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
        this.registry.set('texturecoll', flower.texture)
        this.registry.set('human', flower.color)
        flower.destroy();
        this.scene.pause("fieldScene");
        this.scene.launch("pluckScene");
        this.darkenBackgroundColor();
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

  darkenBackgroundColor() {
    // Convert the current background color to a Phaser Display Color object
    let color = Phaser.Display.Color.IntegerToColor(
      this.currentBackgroundColor
    );

    // Reduce the lightness of the color
    color.darken(10); // Adjust the value to control the amount of darkening

    // Update the current background color
    this.currentBackgroundColor = color.color;

    // Set the new background color
    this.cameras.main.setBackgroundColor(this.currentBackgroundColor);
  }
}
