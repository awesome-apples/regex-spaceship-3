import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
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
        this.play("run", true);
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
        this.play("run", true);
      }
    }

    //neutral (no movement)
    else {
      this.setVelocityX(0);
      if (!this.armed) {
        this.play("idleUnarmed");
      } else {
        this.play("idleArmed");
      }
    }
  }
  updateJump(cursors) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("jump");
    }
  }
  // Check which controller button is being pushed and execute movement & animation
  update(cursors) {
    // << INSERT CODE HERE >>
    this.updateMovement(cursors);
    this.updateJump(cursors);
    this.updateInAir();
  }
}
