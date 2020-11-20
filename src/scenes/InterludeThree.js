import "phaser";

export default class InterludeThree extends Phaser.Scene {
  constructor() {
    super("InterludeThree");
  }

  preload() {
    this.load.image("lvl4", "assets/titleScreens/lvl4.png");
  }

  create() {
    this.add.image(400, 300, "lvl4").setScale(2.5);
    this.input.on("pointerdown", () => this.scene.start("LvlFourScene"));
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    // this.scene.launch("BgScene");
    // this.scene.launch("FgScene");
  }
}
