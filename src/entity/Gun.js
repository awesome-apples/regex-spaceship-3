import "phaser";

export default class Gun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.fireDelay = 100;
    this.lastFired = 0;
  }

  // Check which controller button is being pushed and execute movement & animation
  update(time, player, cursors, fireLaserFn) {
    // << INSERT CODE HERE >>
    if (cursors.space.isDown && time > this.lastFired) {
      if (player.armed) {
        fireLaserFn();
        this.lastFired = time + this.fireDelay;
      }
    }
  }
}
