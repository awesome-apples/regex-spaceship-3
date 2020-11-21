import "phaser";

export default class InterludeTwo extends Phaser.Scene {
  constructor() {
    super("InterludeTwo");
  }

  preload() {
    this.load.image("lvl3", "assets/titleScreens/lvl3.png");
  }

  create() {
    this.add.image(400, 300, "lvl3").setScale(2.5);
    this.input.on("pointerdown", () => this.scene.start("LvlThreeScene"));
  }
}
