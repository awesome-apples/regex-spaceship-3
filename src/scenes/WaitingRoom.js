import Phaser from 'phaser';

export default class WaitingRoom extends Phaser.Scene {
  constructor() {
    super('WaitingRoom');
    this.state = {};
    this.hasBeenSet = false;
  }

  init(data) {
    this.socket = data.socket;
  }

  preload() {
    this.load.html('codeform', 'assets/text/codeform.html');
  }

  create() {
    const scene = this;
    // scene.socket = io();

    scene.popUp = scene.add.graphics();
    scene.boxes = scene.add.graphics();

    // for popup window
    scene.popUp.lineStyle(1, 0xffffff);
    scene.popUp.fillStyle(0xffffff, 0.5);

    // for boxes
    scene.boxes.lineStyle(1, 0xffffff);
    scene.boxes.fillStyle(0xa9a9a9, 1);

    // popup window
    scene.popUp.strokeRect(25, 25, 750, 500);
    scene.popUp.fillRect(25, 25, 750, 500);

    //title
    scene.title = scene.add.text(100, 75, 'RegEx Spaceship', {
      fill: '#add8e6',
      fontSize: '66px',
      fontStyle: 'bold',
    });

    //left popup
    scene.boxes.strokeRect(100, 200, 275, 100);
    scene.boxes.fillRect(100, 200, 275, 100);

    scene.requestButton = scene.add
      .dom(
        237.5,
        270,
        'button',
        'width: 150px; height: 25px',
        'Request Room Key'
      )
      .setOrigin(0.5);

    // scene.requestButton = scene.add.text(140, 215, "Request Room Key", {
    //   fill: "#000000",
    //   fontSize: "20px",
    //   fontStyle: "bold",
    // });

    //right popup
    scene.boxes.strokeRect(425, 200, 275, 100);
    scene.boxes.fillRect(425, 200, 275, 100);
    scene.inputElement = scene.add.dom(562.5, 250).createFromCache('codeform');
    scene.inputElement.addListener('click');
    scene.inputElement.on('click', function (event) {
      if (event.target.name === 'enterRoom') {
        const input = scene.inputElement.getChildByName('code-form');
        let uppercase = input.value.replace(/[a-z]/g, (L) => L.toUpperCase());
        scene.socket.emit('isKeyValid', uppercase);
      }
    });

    scene.requestButton.setInteractive();
    scene.requestButton.on('pointerdown', () => {
      scene.socket.emit('getRoomCode');
      scene.requestButton.disableInteractive();
    });

    scene.notValidText = scene.add.text(500, 270, '', {
      fill: '#ff0000',
      fontSize: '15px',
    });
    scene.roomKeyText = scene.add.text(195, 220, '', {
      fill: '#00ff00',
      fontSize: '30px',
      fontStyle: 'bold',
    });

    scene.socket.on('roomCreated', function (roomKey) {
      scene.roomKey = roomKey;
      scene.roomKeyText.setText(scene.roomKey);
    });
    scene.socket.on('keyNotValid', function () {
      scene.notValidText.setText('Invalid Room Key');
    });
    scene.socket.on('keyIsValid', function (input) {
      scene.socket.emit('joinRoom', input);
      scene.scene.stop('WaitingRoom');
    });
    scene.socket.on('gameAlreadyStarted', function () {
      console.log('inside already started listener');
      scene.notValidText.setText('Game has already begun');
    });
  }
  update() {}
}
