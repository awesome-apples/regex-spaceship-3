import "phaser";

export default class ScoreBoard extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, fillColor) {
    super(scene, x, y, width, height, fillColor);
    this.scene = scene;
    this.scene.add.existing(this);
  }

  preload() {}

  create() {
    // this.board = this.add.graphics();

    // //make board
    // this.board.lineStyle(1, 0xffffff);
    // this.board.fillStyle(0x000000, 1);

    //add scores to board
    // let yPos = this.y - 10;
    // scores.forEach((score) => addScore(score, yPos));
  }

  // addScore(score, yPos) {
  //   this.add.text(this.x + 20, yPos, `${score.userId}   ${score.points}`, {
  //     fill: "#0000ff",
  //     fontSize: "8px",
  //   });

  //   yPos += 10;
  // }
}
