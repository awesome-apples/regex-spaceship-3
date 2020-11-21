import "phaser";

export default class InterludeOne extends Phaser.Scene {
  constructor() {
    super("InterludeOne");
  }

  preload() {
    this.load.image("lvl2", "assets/titleScreens/lvl2.png");
    this.load.image("button33", "assets/buttons/44.png");
    this.load.image("button44", "assets/buttons/33.png");
  }

  create() {
    // console.log("config points", game.config.points);
    // console.log("config health", game.config.health);
    this.add.image(400, 300, "lvl2").setScale(2.5);

    const helloButtonThree = this.add
      .image(400, 300, "button33")
      .setScale(0.25);
    helloButtonThree.setInteractive();
    const helloButtonFour = this.add.image(400, 300, "button44").setScale(0.25);
    helloButtonFour.visible = false;

    helloButtonThree.on("pointerover", () => (helloButtonFour.visible = true));
    helloButtonThree.on("pointerout", () => (helloButtonFour.visible = false));
    helloButtonThree.on("pointerdown", () => {
      this.scene.start("LvlTwoScene");
      this.scene.stop("InterludeOne");
    });

    // this.input.on("pointerdown", () => {
    //   this.scene.start("LvlTwoScene");
    //   this.scene.stop("InterludeOne");
    // });
  }
}
