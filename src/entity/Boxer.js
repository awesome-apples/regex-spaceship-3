import "phaser";

export default class Boxer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = false;
    this.levelNum = 1;
    this.movementInt = 1;
  }
  updateMovement(movementInt) {
    //move left

    if (movementInt > 0) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-50);
      this.body.setBounce(1);

      if (this.body.touching.down) {
        this.play("boxerfly", true);
      }
    }

    // neutral (no movement)
    else {
      this.setVelocityX(-10);
      this.play("boxerfly");
    }
  }

  update() {
    // << INSERT CODE HERE >>

    this.updateMovement(this.movementInt);
  }
}
