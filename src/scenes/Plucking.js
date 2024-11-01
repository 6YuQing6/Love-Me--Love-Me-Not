class Pluck extends Phaser.Scene {
  constructor() {
    super("pluckScene");
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    this.thewholeflower = [];
    this.thewholeflowerpositions = [
      [70, -110],
      [-70, -110],
      [100, 0],
      [-100, 0],
      [0, 85],
      [0, 0],
    ];
    for (let i = 0; i < 6; i += 1) {
      this.thewholeflower.push(
        this.physics.add.sprite(
          this.scale.width / 2 + this.thewholeflowerpositions[i][0],
          this.scale.height / 2 + this.thewholeflowerpositions[i][1],
          "petal-blue",
          i
        )
      );
      if (i < 5) {
        this.makeItDrag(this, this.thewholeflower[i]);
      }
    }
  }

  update() {
    let count = 0;
    for (let i = 0; i < 5; i += 1) {
      if (this.thewholeflower[i].y > this.scale.height) {
        count += 1;
      }
    }
    if (count == 5) {
      this.time.delayedCall(1500, () => {
        this.scene.resume("fieldScene");
        this.scene.stop();
      });
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.scene.resume("fieldScene");
      this.scene.stop();
    }
  }
  // code from https://www.youtube.com/watch?app=desktop&v=jWglIBp4usY
  makeItDrag(scene, gameObject) {
    gameObject.setInteractive();

    function startDrag() {
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    }

    function stopDrag() {
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);
      scene.scene.pause("pluckScene");
      scene.scene.launch("dialogScene");
      gameObject.setGravityY(1000);

      const checkPetalPosition = () => {
        if (gameObject.y >= scene.scale.height) {
          const emitter = scene.add.particles(
            gameObject.x,
            gameObject.y,
            "petal-blue",
            {
              lifespan: 4000,
              speed: { min: 250, max: 450 },
              scale: { start: 0.2, end: 0.0 },
              gravityY: 300,
              emitting: false,
            }
          );
          emitter.explode(32); // adds particle explosion
        } else {
          scene.time.delayedCall(100, checkPetalPosition, [], scene);
        }
      };

      checkPetalPosition();
    }

    function onDrag(pointer) {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
  }
}
