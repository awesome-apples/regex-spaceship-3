import Phaser from "phaser";

export default class SmallMap extends Phaser.Scene {
  constructor() {
    super("SmallMap");
  }

  preload() {
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("map", "assets/backgrounds/small_map.png");
    this.load.audio("click", "audio/Button_Click.wav");
  }

  async create() {
    const scene = this;

    scene.click = scene.sound.add("click");

    scene.graphics = scene.add.image(400, 300, "computer");
    scene.mapImg = scene.add.image(400, 300, "map").setScale(0.5);

    scene.add.text(125, 83, "Map of Spaceship", {
      fill: "#00ff00",
      fontSize: "34px",
      fontStyle: "bold",
    });

    //RETURN BUTTON
    scene.returnContainer = scene.add.rexRoundRectangle(
      175,
      502,
      80,
      25,
      5,
      0xfa8128
    );
    scene.returnText = scene.add.text(148, 494, "Return", {
      fill: "#000000",
      fontSize: "15px",
      fontStyle: "bold",
    });

    scene.returnContainer.setInteractive();
    scene.returnContainer.on("pointerover", () => {
      scene.returnContainer.setFillStyle(0xfaa562);
    });
    scene.returnContainer.on("pointerout", () => {
      scene.returnContainer.setFillStyle(0xfa8128);
    });
    scene.returnContainer.on("pointerdown", () => {
      scene.click.play();
      scene.scene.stop("SmallMap");
    });
  }
}
