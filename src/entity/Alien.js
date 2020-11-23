import "phaser";

export default class Alien extends Phaser.Physics.Arcade.Sprite {
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
      this.play("alienrun", true);
    }

    // neutral (no movement)
    else {
      this.setVelocityX(-10);
      this.play("alienrun");
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("alienjump");
    }
  }

  // Check which controller button is being pushed and execute movement & animation
  update() {
    this.updateMovement();
  }
}
