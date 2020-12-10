import Phaser from 'phaser';

export default class SmallMap extends Phaser.Scene {
  constructor() {
    super('SmallMap');
  }

  preload() {
    this.load.image('computer', 'assets/backgrounds/computer.png');
    this.load.image('map', 'assets/backgrounds/small_map.png');
  }

  async create() {
    const scene = this;

    scene.graphics = scene.add.image(400, 300, 'computer');
    scene.mapImg = scene.add.image(155, 140, 'map');

    scene.add.text(125, 83, 'Map of Spaceship', {
      fill: '#00ff00',
      fontSize: '34px',
      fontStyle: 'bold',
    });
  }
}
