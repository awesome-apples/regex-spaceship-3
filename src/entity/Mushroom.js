import "phaser";

export default class Mushroom extends Phaser.Physics.Arcade.Sprite {
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
  //   create() {
  //     this.createEnemies();
  //   }
  //   moveEnemies() {
  //     const randNumber = Math.floor(Math.random() * 4 + 1);

  //     switch (randNumber) {
  //       case 1:
  //         this.body.setVelocityX(50);
  //         break;
  //       case 2:
  //         this.body.setVelocityX(-50);
  //         break;
  //       case 3:
  //         this.body.setVelocityY(50);
  //         break;
  //       case 4:
  //         this.body.setVelocityY(50);
  //         break;
  //       default:
  //         this.body.setVelocityX(50);
  //     }
  //   }
  updateMovement() {
    //move left

    if (!this.facingLeft) {
      this.flipX = !this.flipX;
      this.facingLeft = true;
    }
    this.setVelocityX(-5);
    if (this.body.touching.down) {
      this.play("mushroomrun", true);
    }

    //move right
    //   else if (movementInt < 6) {
    //     if (this.facingLeft) {
    //       this.flipX = !this.flipX;
    //       this.facingLeft = false;
    //     }
    //     this.setVelocityX(5);
    //     if (this.body.touching.down) {
    //       this.play("mushroomrun", true);
    //     }
    //   }

    // neutral (no movement)
    else {
      this.setVelocityX(-10);
      this.play("mushroomrun");
    }
  }
  //   updateJump(movementInt) {
  //     if (movementInt > 12 && this.body.touching.down) {
  //       this.setVelocityY(-800);
  //     }
  //   }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("mushroomjump");
    }
  }
  //   //Movement Number Generator
  //   movement(levelNum) {
  //     this.movementInt = Math.floor(Math.random() * Math.floor(levelNum + 10));
  //     console.log("is movement being called again");
  //   }

  // Check which controller button is being pushed and execute movement & animation
  update() {
    this.updateMovement();
    // << INSERT CODE HERE >>
    // this.movement(this.levelNum);
    // this.updateMovement(this.movementInt);
    // this.updateJump(this.movementInt);
    // this.updateInAir();
  }
}
