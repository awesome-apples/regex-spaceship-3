import "phaser";

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.movementInt = 1;
  }
  updateMovement(movementInt) {
    //move left
  }

  update() {
    // << INSERT CODE HERE >>
    // this.updateMovement(this.movementInt);
  }
}
