import "phaser";

export default class Speaker extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y);
    this.speaker = "musicOn";
    this.x = x;
    this.y = y;

    this.scene = scene;

    this.scene.add.existing(this);

    console.log("in speaker");
  }

  preload() {
    this.load.image("musicOn", "assets/sprites/music_on.png");
    this.load.image("musicOff", "assets/sprites/music_off.png");
    this.load.image("controlPanelLeft", "assets/sprites/console_s.png");
  }

  create() {
    // this.add.image(600, 50, "controlPanelLeft");
  }
}
