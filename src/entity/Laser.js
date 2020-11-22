import "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingLeft) {
    super(scene, x, y, spriteKey, facingLeft);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.facingLeft = facingLeft;
    this.speed = Phaser.Math.GetSpeed(800, 1); // (distance in pixels, time (ms))
    // How long the laser will live (ms). Hard coded here for simplicity
    this.lifespan = 600;
    // Important to not apply gravity to the laser bolt!
    this.body.setAllowGravity(false);
    this.reset(x, y, facingLeft);
  }

  // Check which controller button is being pushed and execute movement & animation
  reset(x, y, facingLeft) {
    this.setActive(true);
    this.setVisible(true);
    this.lifespan = 900;
    this.facingLeft = facingLeft;
    this.setPosition(x, y);
  }

  update(time, delta) {
    // << INSERT CODE HERE >>
    this.lifespan -= delta;
    const moveDistance = this.speed * delta;
    if (this.facingLeft) {
      this.x -= moveDistance;
    } else {
      this.x += moveDistance;
    }
    // If this laser has run out of lifespan, we "kill it" by deactivating it.
    // We can then reuse this laser object
    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
