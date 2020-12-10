import Phaser from 'phaser';

export default class SmallMap extends Phaser.Scene {
  constructor() {
    super('SmallMap');
  }

  preload() {
    this.load.image('computer', 'assets/backgrounds/computer.png');
  }

  async create() {
    const scene = this;

    scene.graphics = scene.add.image(400, 300, 'computer');

    scene.add.text(125, 83, 'Map of Spaceship', {
      fill: '#00ff00',
      fontSize: '34px',
      fontStyle: 'bold',
    });

    scene.add.text(
      155,
      140,
      'Here is the map!',
      {
        fill: '#00ff00',
        fontSize: '20px',
        fontStyle: 'bold',
        align: 'left',
        wordWrap: { width: 480, height: 445, useAdvancedWrap: true },
      }
    );
  }
}
