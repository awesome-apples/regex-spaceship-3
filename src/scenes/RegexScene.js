import Phaser from "phaser";
import store from "../store";
import { fetchRandomTasks } from "../store/randomTasks";

export default class RegexScene extends Phaser.Scene {
  constructor() {
    super("RegexScene");
    this.state = {};
  }

  preload() {
    this.load.html("taskform", "assets/text/taskform.html");
  }

  async create() {
    const scene = this;

    try {
      console.log("hello");
      await store.dispatch(fetchRandomTasks());
      this.state = store.getState();
      console.log("state: ", this.state);

      scene.graphics = scene.add.graphics();
      scene.graphics2 = scene.add.graphics();

      // for popup window
      scene.graphics.lineStyle(1, 0xffffff);
      scene.graphics.fillStyle(0xffffff, 0.5);

      // for boxes
      scene.graphics2.lineStyle(1, 0xffffff);
      scene.graphics2.fillStyle(0xffffff, 1);

      // game windows: w: 800; h: 600
      // whole popup window: x, y, w, h

      // popup window
      scene.graphics.strokeRect(25, 25, 750, 550);
      scene.graphics.fillRect(25, 25, 750, 550);

      // regex problem prompt
      scene.graphics2.strokeRect(50, 50, 325, 450);
      scene.graphics2.fillRect(50, 50, 325, 450);
      scene.add.text(55, 55, "Example Problem", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });

      // input area
      scene.graphics2.strokeRect(425, 50, 325, 225);
      scene.graphics2.fillRect(425, 50, 325, 225);
      scene.add.text(430, 55, "Input Here", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });

      // scene.inputField = scene.add
      //     .dom(425, 50)
      //     .createFromCache("taskform")

      // output area
      scene.graphics2.strokeRect(425, 325, 325, 175);
      scene.graphics2.fillRect(425, 325, 325, 175);
      scene.add.text(430, 330, "Output Here", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });

      scene.add.text(430, 285, "Correct/Incorrect", {
        fill: "#000000",
        fontSize: "30px",
        fontStyle: "bold",
      });

      scene.exit = scene.add.text(55, 525, "Return", {
        fill: "#000000",
        fontSize: "30px",
        fontStyle: "bold",
      });
      scene.exit.setInteractive();
      scene.exit.on("pointerdown", () => {
        scene.scene.sleep("RegexScene");
      });

      scene.add.text(642, 525, "Submit", {
        fill: "#000000",
        fontSize: "30px",
        fontStyle: "bold",
      });
    } catch (err) {
      console.error(err);
    }
  }
}
