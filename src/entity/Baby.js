import "phaser";
import Phaser from "phaser";

export default class Baby extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = false;
    this.armed = false;
  }
  updateMovement(cursors) {
    //move left
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play("babyrun", true);
      }
    }
    //move right
    else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(360);
      if (this.body.touching.down) {
        this.play("babyrun", true);
      }
    }

    // neutral (no movement)
    else {
      this.setVelocityX(0);
      if (!this.armed) {
        this.play("babyidleUnarmed");
      } else {
        this.play("babyidleArmed");
      }
    }
  }
  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-850);
      jumpSound.play();
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("babyjump", true);
    }
  }
  // Check which controller button is being pushed and execute movement & animation
  update(cursors, jumpSound) {
    // << INSERT CODE HERE >>
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);

    this.updateInAir();
  }
}
