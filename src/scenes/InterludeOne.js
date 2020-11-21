import "phaser";

export default class InterludeOne extends Phaser.Scene {
  constructor() {
    super("InterludeOne");
  }

  preload() {
    this.load.image("lvl2", "assets/titleScreens/lvl2.png");
  }

  create() {
    console.log("config points", game.config.points);
    console.log("config health", game.config.health);
    this.add.image(400, 300, "lvl2").setScale(2.5);
    this.input.on("pointerdown", () => this.scene.start("LvlTwoScene"));
  }
}
