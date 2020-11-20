import "phaser";

export default class InterludeTwo extends Phaser.Scene {
  constructor() {
    super("InterludeTwo");
  }

  preload() {
    this.load.image("lvl3", "assets/titleScreens/lvl3.png");
  }
  // handleLevels() {
  //   if (game.config.level === 2) {
  //     this.scene.launch("LvlTwoScene");
  //   } else if (game.config.level === 3) {
  //     this.scene.launch("LvlThreeScene");
  //   } else if (game.config.level === 4) {
  //     this.scene.launch("LvlFourScene");
  //   }
  // }

  create() {
    this.add.image(400, 300, "lvl3").setScale(2.5);
    this.input.on("pointerdown", () => this.scene.start("LvlThreeScene"));
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    // this.scene.launch("BgScene");
    // this.scene.launch("FgScene");
  }
}
