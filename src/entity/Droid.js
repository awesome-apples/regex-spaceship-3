import "phaser";

export default class Droid extends Phaser.Physics.Arcade.Sprite {
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
  updateMovement() {
    //move left

    if (!this.facingLeft) {
      this.flipX = !this.flipX;
      this.facingLeft = true;
    }

    this.setVelocityX(-5);
    if (this.body.touching.down) {
      this.play("droidrun", true);
    }

    // neutral (no movement)
    else {
      this.setVelocityX(-10);
      this.play("droidrun");
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("droidjump");
    }
  }

  // Check which controller button is being pushed and execute movement & animation
  update() {
    this.updateMovement();
  }
}
