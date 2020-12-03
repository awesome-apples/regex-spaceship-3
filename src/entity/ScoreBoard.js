import "phaser";

export default class ScoreBoard extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, scores) {
    super(scene, x, y, scores);

    this.scene = scene;
    this.scene.add.existing(this);

    this.x = 240;
    this.y = 100;
  }

  preload() {}

  create() {
    this.board = this.add.graphics();

    //make board
    this.board.lineStyle(1, 0xffffff);
    this.board.fillStyle(0x000000, 1);
    this.board.strokeRect(this.x, this.y, 250, 200);
    this.board.fillRect(this.x, this.y, 250, 200);

    //add scores to board
    let yPos = this.y - 10;
    scores.forEach((score) => addScore(score, yPos));
  }

  addScore(score, yPos) {
    this.add.text(this.x + 20, yPos, `${score.userId}   ${score.points}`, {
      fill: "#0000ff",
      fontSize: "8px",
    });

    yPos += 10;
  }
}
