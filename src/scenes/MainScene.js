import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("splash", "assets/splash.png");
    this.load.image("button", "assets/buttons/1.png");
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
    game.config.health = 10;
    game.config.points = 5;
    this.add.image(400, 300, "splash").setScale(2.5);
    const helloButton = this.add.image(400, 300, "button").setScale(0.25);
    helloButton.setInteractive();
    helloButton.on("pointerdown", () => this.scene.start("FgScene"));
  }
}
