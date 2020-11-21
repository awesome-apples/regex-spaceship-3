import "phaser";

export default class FinishTitle extends Phaser.Scene {
  constructor() {
    super("FinishTitle");
  }

  preload() {
    this.load.image("finish", "assets/titleScreens/finish.png");
  }

  create() {
    this.add.image(400, 300, "finish").setScale(2.5);
  }
}
