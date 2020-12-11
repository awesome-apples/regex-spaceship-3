import Phaser from 'phaser';

export default class Instructions extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  preload() {
    this.load.image('computer', 'assets/backgrounds/computer.png');
  }

  async create() {
    const scene = this;

    scene.graphics = scene.add.image(400, 300, 'computer');

    scene.add.text(125, 83, 'Instructions', {
      fill: '#00ff00',
      fontSize: '34px',
      fontStyle: 'bold',
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
    scene.returnText = scene.add.text(147, 493, 'Return', {
      fill: '#000000',
      fontSize: '15px',
      fontStyle: 'bold',
    });

    scene.returnContainer.setInteractive();
    scene.returnContainer.on('pointerover', () => {
      scene.returnContainer.setFillStyle(0xfaa562);
    });
    scene.returnContainer.on('pointerout', () => {
      scene.returnContainer.setFillStyle(0xfa8128);
    });
    scene.returnContainer.on('pointerdown', () => {
      scene.scene.stop('Instructions');
    });

    scene.add.text(
      155,
      140,
      'Gameplay \n\n-Use the arrow keys to walk to the room your task is in. \n\n\n\n-Walk up to the red highlighted item. \n\n\n-When you are touching the item, it will turn green, this means you can click it with your mouse. \n\n\n\n\n-A pop up will appear. You can put your answer in the input tab.',
      {
        fill: '#00ff00',
        fontSize: '15px',
        fontStyle: 'bold',
        align: 'left',
        wordWrap: { width: 240, height: 445, useAdvancedWrap: true },
      }
    );
    scene.add.text(
      405,
      140,
      'RegEx Basics \n\n-All regular expressions \nstart and end with / \n\n-RegEx will find the \nfirst instance of what you \nare looking for, unless \nyou put a g after your \nclosing / (this is called \nthe global flag) \n\n-\\s represents whitespace \n\n-[ ] will look for all \nthe characters you put \nwithin it, in any order \n\n- | represents "or"',
      {
        fill: '#00ff00',
        fontSize: '15px',
        fontStyle: 'bold',
        align: 'left',
      }
    );
  }
}
