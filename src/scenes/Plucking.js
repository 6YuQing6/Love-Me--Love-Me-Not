class Pluck extends Phaser.Scene {
  constructor() {
    super("pluckScene");
  }

  init() {
    this.firstPluck = false;
  }

  create() {
    this.thingy = this.registry.get('texturecoll');
    this.human = this.registry.get('human');
    this.actual = '';
    this.thewholeflower = [];
    this.thewholeflowerpositions = [
      [70, -110],
      [-70, -110],
      [100, 0],
      [-100, 0],
      [0, 85],
      [0, 0],
    ];
    switch(this.thingy.key){
      case 'blue-flower':
        this.actual = 'petal-blue';
        break;
      case 'red-flower':
        this.actual = 'petal-red';
        break;
      case 'purple-flower':
        this.actual = 'petal-purple';
        break;
      case 'human-flower':
        switch(this.human){
            case 'purple-flower':
              this.actual = 'petal-purple';
              this.thewholeflowerpositions = [
                [30, -120],
                [40, 0],
                [-60, -140],
                [-30, 25]
              ];
              for (let i = 0; i < 4; i += 1) {
                this.thewholeflower.push(
                  this.physics.add.sprite(
                    this.scale.width / 2 + this.thewholeflowerpositions[i][0],
                    this.scale.height / 2 + this.thewholeflowerpositions[i][1],
                    'flower-appendages',
                    i+8
                 ).setScale(20)
                );
                  this.makeItDrag(this, this.thewholeflower[i]);
              }
              this.thewholeflower.push(this.physics.add.sprite(this.scale.width/2, this.scale.height/2 - 300, 'flower-head', 0).setScale(20));
              this.makeItDrag(this, this.thewholeflower[4]);
              break;
            case 'red-flower':
              this.actual = 'petal-red';
              this.thewholeflowerpositions = [
                [30, -120],
                [40, 0],
                [-60, -140],
                [-30, 25]
              ];
              for (let i = 0; i < 4; i += 1) {
                this.thewholeflower.push(
                  this.physics.add.sprite(
                    this.scale.width / 2 + this.thewholeflowerpositions[i][0],
                    this.scale.height / 2 + this.thewholeflowerpositions[i][1],
                    'flower-appendages',
                    i
                 ).setScale(20)
                );
                  this.makeItDrag(this, this.thewholeflower[i]);
              }
              this.thewholeflower.push(this.physics.add.sprite(this.scale.width/2, this.scale.height/2 -300, 'flower-head', 0).setScale(20));
              this.makeItDrag(this, this.thewholeflower[4]);
              break;
            case 'blue-flower':
              this.actual = 'petal-blue';
              this.thewholeflowerpositions = [
                [30, -120],
                [40, 0],
                [-60, -140],
                [-30, 25]
              ];
              for (let i = 0; i < 4; i += 1) {
                this.thewholeflower.push(
                  this.physics.add.sprite(
                    this.scale.width / 2 + this.thewholeflowerpositions[i][0],
                    this.scale.height / 2 + this.thewholeflowerpositions[i][1],
                    'flower-appendages',
                    i+4
                 ).setScale(20)
                );
                  this.makeItDrag(this, this.thewholeflower[i]);
              }
              this.thewholeflower.push(this.physics.add.sprite(this.scale.width/2, this.scale.height/2 -300, 'flower-head', 0).setScale(20));
              this.makeItDrag(this, this.thewholeflower[4]);
              break;
        }
        break;
    }
    cursors = this.input.keyboard.createCursorKeys();
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    if(this.thingy.key != 'human-flower'){
      for (let i = 0; i < 6; i += 1) {
        this.thewholeflower.push(
          this.physics.add.sprite(
            this.scale.width / 2 + this.thewholeflowerpositions[i][0],
            this.scale.height / 2 + this.thewholeflowerpositions[i][1],
            this.actual,
            i
         )
        );
        if (i < 5) {
          this.makeItDrag(this, this.thewholeflower[i]);
        }
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

    const startDrag = () => {
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag);
    };

    const stopDrag = () => {
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag);
      gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag);
      gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag);
      if (!scene.firstPluck) {
        scene.scene.pause("pluckScene");
        scene.scene.launch("dialogScene");
        scene.firstPluck = true;
      }

      gameObject.setGravityY(1000);

      const checkPetalPosition = () => {
        if (gameObject.y >= scene.scale.height) {
          const emitter = scene.add.particles(
            gameObject.x,
            gameObject.y,
            this.actual,
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
    };

    const onDrag = (pointer) => {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    };

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag);
  }
}
