import Phaser from 'phaser';

export default class LoseScene extends Phaser.Scene {
  constructor() {
    super('LoseScene');
    this.state = {};
  }

  init(data) {
    this.users = data.users;
    this.randomTasks = data.randomTasks;
    this.scores = data.scores;
    this.gameScore = data.gameScore;
  }

  preload() {}

  async create() {
    const scene = this;

    try {
      //sockets
      this.socket = io();

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
      scene.add.text(292, 280, 'GAME OVER', {
        fill: '#ff0000',
        fontSize: '40px',
        fontStyle: 'bold',
      });
    } catch (err) {
      console.error(err);
    }
  }
}
