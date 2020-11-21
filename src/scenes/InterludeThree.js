import "phaser";

export default class InterludeThree extends Phaser.Scene {
  constructor() {
    super("InterludeThree");
  }

  preload() {
    this.load.image("lvl4", "assets/titleScreens/lvl4.png");
    this.load.image("button77", "assets/buttons/77.png");
    this.load.image("button88", "assets/buttons/88.png");
  }

  create() {
    this.add.image(400, 300, "lvl4").setScale(3.3);
    // this.input.on("pointerdown", () => this.scene.start("LvlFourScene"));

    const helloButtonSeven = this.add
      .image(400, 300, "button77")
      .setScale(0.25);
    helloButtonSeven.setInteractive();
    const helloButtonEight = this.add
      .image(400, 300, "button88")
      .setScale(0.25);
    helloButtonEight.visible = false;

    helloButtonSeven.on("pointerover", () => (helloButtonEight.visible = true));
    helloButtonSeven.on("pointerout", () => (helloButtonEight.visible = false));
    helloButtonSeven.on("pointerdown", () => {
      this.scene.start("LvlFourScene");
      this.scene.stop("InterludeThree");
    });
    // this.input.on("pointerdown", () => {
    //   this.scene.start("LvlFourScene");
    //   this.scene.stop("InterludeThree");
    // });
  }
}
