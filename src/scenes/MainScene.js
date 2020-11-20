import "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("splash", "assets/splash.png");
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
    this.add.image(400, 300, "splash").setScale(2.5);
    this.input.on("pointerdown", () => this.scene.start("FgScene"));
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    // this.scene.launch("BgScene");
    // this.scene.launch("FgScene");
  }
}
