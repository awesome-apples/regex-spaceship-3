import Phaser from "phaser";

export default class RegexScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
    this.state = {};
  }
  create() {
    this.add.text(400, 300, "YOU WON", {
      fill: "#000000",
      fontSize: "48px",
      fontStyle: "bold",
    });
  }
}
