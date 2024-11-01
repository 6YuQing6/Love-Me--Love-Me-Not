class Pluck extends Phaser.Scene {
  constructor() {
    super("pluckScene");
  }

  create() {
    cursors = this.input.keyboard.createCursorKeys();
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
    this.thewholeflower = []
    this.thewholeflowerpositions = [[70,-110],[-70,-110],[100,0],[-100,0],[0,85],[0,0]]
    for(let i = 0; i < 6; i += 1){
      this.thewholeflower.push(this.physics.add.sprite(this.scale.width/2 + this.thewholeflowerpositions[i][0],this.scale.height/2 + this.thewholeflowerpositions[i][1],'petal-blue', i))
      if(i < 5){
        this.makeItDrag(this.thewholeflower[i])
      }
    }
  }

  update() {
    let count = 0
    for(let i = 0; i < 5; i += 1){
      if(this.thewholeflower[i].y > this.scale.height){
        count += 1
      }
    }
    if(count == 5){
      this.scene.resume("fieldScene");
      this.scene.stop();
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.scene.resume("fieldScene");
      this.scene.stop();
    }
  }
  // code from https://www.youtube.com/watch?app=desktop&v=jWglIBp4usY
  makeItDrag(gameObject){
    gameObject.setInteractive()

    function startDrag(){
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag)
      gameObject.on(Phaser.Input.Events.POINTER_UP, stopDrag)
      gameObject.on(Phaser.Input.Events.POINTER_MOVE, onDrag)
    }
    function stopDrag(){
      gameObject.off(Phaser.Input.Events.POINTER_DOWN, startDrag)
      gameObject.off(Phaser.Input.Events.POINTER_UP, stopDrag)
      gameObject.off(Phaser.Input.Events.POINTER_MOVE, onDrag)
      gameObject.setGravityY(1000)
    }
    function onDrag(pointer){
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    }

    gameObject.on(Phaser.Input.Events.POINTER_DOWN, startDrag)
  }
}
