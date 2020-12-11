import "phaser";

export default class ProgressBar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.value = 0;
    this.taskAmount = 9;

    this.draw();

    scene.add.existing(this.bar).setScrollFactor(0);
  }

  changeTaskAmount(newTaskAmount) {
    this.taskAmount = newTaskAmount;
    this.pixels = 186 / this.taskAmount;
  }

  increase(amount) {
    this.value += amount;

    if (this.value > this.taskAmount) {
      this.value = this.taskAmount;
    }

    this.draw();

    return this.value === this.taskAmount;
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 190, 16);

    //  Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, 186, 12);

    this.bar.fillStyle(0x00ff00);

    if (this.pixels) {
      var pixelsCompleted = Math.floor(this.pixels * this.value);

      this.bar.fillRect(this.x + 2, this.y + 2, pixelsCompleted, 12);
    }
  }
}
