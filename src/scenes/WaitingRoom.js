import Phaser from 'phaser';

export default class WaitingRoom extends Phaser.Scene {
  constructor() {
    super('WaitingRoom');
    this.state = {};
    this.key.hasBeenSet = false;
  }

  preload() {
    this.load.html('codeform', 'assets/text/codeform.html');
  }

  create() {
    const scene = this;
    scene.socket = io();
    scene.notValidText = scene.add.text(670, 295, '', {
      fill: '#ff0000',
      fontSize: '15px',
    });
    scene.socket.on('roomCreated', function (roomKey) {
      scene.roomKey = roomKey;
    });
    scene.socket.on('keyNotValid', function () {
      scene.notValidText.setText('Invalid Room Key');
    });
    scene.socket.on('keyIsValid', function (input) {
      scene.socket.emit('joinRoom', {
        roomKey: input,
        socket: scene.socket,
      });
      scene.scene.launch('MainScene', { socket: scene.socket });
      scene.scene.stop('WaitingRoom');
    });

    scene.popUp = scene.add.graphics();
    scene.boxes = scene.add.graphics();

    // for popup window
    scene.popUp.lineStyle(1, 0xffffff);
    scene.popUp.fillStyle(0xffffff, 0.5);

    // for boxes
    scene.boxes.lineStyle(1, 0xffffff);
    scene.boxes.fillStyle(0xffffff, 1);

    // popup window
    scene.popUp.strokeRect(25, 75, 750, 500);
    scene.popUp.fillRect(25, 75, 750, 500);

    //left popup
    scene.graphics2.strokeRect(125, 175, 275, 200);
    scene.graphics2.fillRect(125, 175, 275, 200);
    scene.requestButton = scene.add.text(145, 195, 'Request Room Key', {
      fill: '#000000',
      fontSize: '20px',
      fontStyle: 'bold',
    });

    scene.requestButton.setInteractive();
    scene.requestButton.on('pointerdown', () => {
      scene.socket.emit('getRoomCode');
    });

    scene.roomKeyText = scene.add.text(145, 250, '', {
      fill: '#00ff00',
      fontSize: '20px',
      fontStyle: 'bold',
    });

    //right popup
    scene.graphics2.strokeRect(362.5, 175, 275, 200);
    scene.graphics2.fillRect(362.5, 175, 275, 200);
    scene.inputElement = scene.add.dom(670, 195).createFromCache('codeform');
    scene.inputElement.on('click', function (event) {
      if (event.target.name === 'enterRoom') {
        const input = scene.inputElement.getChildByName('code-form');
        scene.socket.emit('isKeyValid', input);
      }
    });
  }
  update() {
    const scene = this;
    if (this.roomKey !== scene.roomKeyText.text) {
      this.roomKeyText.setText(scene.roomKey);
    }
  }
}
