import "phaser";

export default class InterludeTwo extends Phaser.Scene {
  constructor() {
    super("InterludeTwo");
  }

  preload() {
    this.load.image("lvl3", "assets/titleScreens/lvl3.png");
    this.load.image("button55", "assets/buttons/55.png");
    this.load.image("button66", "assets/buttons/66.png");
  }

  create() {
    this.add.image(400, 300, "lvl3").setScale(2.5);

    const helloButtonFive = this.add.image(400, 300, "button55").setScale(0.25);
    helloButtonFive.setInteractive();
    const helloButtonSix = this.add.image(400, 300, "button66").setScale(0.25);
    helloButtonSix.visible = false;

    helloButtonFive.on("pointerover", () => (helloButtonSix.visible = true));
    helloButtonFive.on("pointerout", () => (helloButtonSix.visible = false));
    helloButtonFive.on("pointerdown", () => {
      this.scene.start("LvlThreeScene");
      this.scene.stop("InterludeTwo");
    });
  }
  //   this.input.on("pointerdown", () => {
  //     this.scene.start("LvlThreeScene");
  //     this.scene.stop("InterludeTwo");
  //   });
  // }
}
