import Phaser from "phaser";
import ScoreBoard from "../entity/ScoreBoard";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
    this.state = {};
  }

  init(data) {
    // this.users = data.users;
    // this.randomTasks = data.randomTasks;
    // this.scores = data.scores;
    // this.gameScore = data.gameScore;
    // this.socket = data.socket;
  }

  preload() {}

  async create() {
    const scene = this;

    try {
      //sockets
      // this.socket = io();

      scene.popUp = scene.add.graphics();
      scene.textBox = scene.add.graphics();

      // for popup window
      scene.popUp.lineStyle(1, 0xffffff);
      scene.popUp.fillStyle(0xffffff, 0.5);

      // for boxes
      scene.textBox.lineStyle(1, 0xffffff);
      scene.textBox.fillStyle(0x000000, 1);

      // popup window
      scene.popUp.strokeRect(25, 25, 750, 550);
      scene.popUp.fillRect(25, 25, 750, 550);

      // input area
      scene.textBox.strokeRect(240, 245, 320, 110);
      scene.textBox.fillRect(240, 245, 320, 110);
      scene.add.text(310, 280, "YOU WIN", {
        fill: "#00ff00",
        fontSize: "40px",
        fontStyle: "bold",
      });

      const scoreBoard = new ScoreBoard(scene, 500, 70, 250, 300, '#000000');

    } catch (err) {
      console.error(err);
    }
  }
}
