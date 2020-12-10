import Phaser from "phaser";

export default class Instructions extends Phaser.Scene {
  constructor() {
    super("Instructions");
  }

  preload() {
    this.load.image("computer", "assets/backgrounds/computer.png");
  }

  async create() {
    const scene = this;

    scene.graphics = scene.add.image(400, 300, "computer");

    scene.add.text(125, 83, "Instructions", {
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
    scene.returnText = scene.add.text(147, 493, "Return", {
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
      scene.scene.stop("Instructions");
    });

    scene.add.text(
      155,
      140,
      "-You must complete your tasks before time runs out. \n\n\n-Use the arrow keys to run around the ship and find the locations of your tasks. \n\n\n\n-When you approach the console at that location, a pop up will appear. \n\n\n-Use your knowledge of regular expressions to complete your task. \n\n\n-If you don’t finish all the tasks before time runs out, you’ll be lost in space forever!",
      {
        fill: "#00ff00",
        fontSize: "20px",
        fontStyle: "bold",
        align: "left",
        wordWrap: { width: 480, height: 445, useAdvancedWrap: true },
      }
    );
  }
}
