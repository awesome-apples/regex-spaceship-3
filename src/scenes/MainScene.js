import Phaser from 'phaser';
import ProgressBar from '../entity/progressBar';
import ControlPanel from '../entity/ControlPanel';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.state = {
      roomKey: '',
      randomTasks: [],
      gameScore: 0,
      scores: {},
      players: {},
      numPlayers: 0,
    };
    this.hasBeenSet = false;
    this.startClickable = true;
    this.beginTimer = false;
  }

  preload() {
    this.load.spritesheet('astronaut', 'assets/spritesheets/astronaut3.png', {
      frameWidth: 29,
      frameHeight: 37,
    });
    this.load.image('controlPanelLeft', 'assets/sprites/console_s.png');
    this.load.image('controlPanelRight', 'assets/sprites/console_w.png');
    this.load.image('star', 'assets/star_gold.png');
    this.load.image('mainroom', 'assets/backgrounds/mainroom.png');
  }

  async create() {
    const scene = this;
    this.add.image(0, 0, 'mainroom').setOrigin(0);

    //PROGRESS BAR
    this.progressText = this.add.text(30, 16, 'Progress Tracker', {
      fontSize: '20px',
      fill: '#ffffff',
    });

    scene.progressBar = new ProgressBar(scene, 30, 50);

    try {
      //SOCKET CONNECTIONS
      this.socket = io();
      scene.scene.launch('WaitingRoom', { socket: scene.socket });
      this.otherPlayers = this.physics.add.group();
      if (!this.hasBeenSet) {
        this.hasBeenSet = true;

        this.socket.on('setState', function (state) {
          const { roomKey, users, randomTasks, scores, gameScore } = state;
          scene.state.roomKey = roomKey;
          scene.state.users = users;
          scene.state.randomTasks = randomTasks;
          scene.state.scores = scores;
          scene.state.gameScore = gameScore;
          scene.roomkeyText = scene.add.text(
            30,
            78,
            `Room Key: ${scene.state.roomKey}`,
            {
              fontSize: '20px',
              fill: '#00ff00',
            }
          );
          console.log('sscene.state.scores in setstate', scene.state.scores);
          console.log('scene.state.roomkey in set state', scene.state.roomKey);
          scene.waitingText = scene.add
            .text(400, 300, 'Waiting for more players to join', {
              fontSize: '20px',
              fill: '#ff0000',
            })
            .setOrigin(0.5);
        });
      }

      this.socket.on('updateState', function (serverState) {
        scene.state = serverState;
        scene.progressBar.changeTaskAmount(scene.state.randomTasks.length);
      });

      this.socket.on('currentPlayers', function (arg) {
        const { players, numPlayers } = arg;
        scene.state.numPlayers = numPlayers;
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === scene.socket.id) {
            scene.addPlayer(scene, players[id]);
          } else {
            scene.addOtherPlayers(scene, players[id]);
          }
        });
      });

      this.socket.on('newPlayer', function (arg) {
        const { playerInfo, numPlayers } = arg;
        scene.addOtherPlayers(scene, playerInfo);
        scene.state.numPlayers = numPlayers;
      });

      this.socket.on('disconnected', function (arg) {
        const { playerId, numPlayers } = arg;
        scene.state.numPlayers = numPlayers;
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy();
          }
        });
      });

      this.socket.on('playerMoved', function (playerInfo) {
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.setRotation(playerInfo.rotation);
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          }
        });
      });
      this.cursors = this.input.keyboard.createCursorKeys();

      this.socket.on('progressUpdate', function (arg) {
        const { gameScore } = arg;
        scene.progressBar.increase(gameScore - scene.state.gameScore);
        scene.state.gameScore = gameScore;
        if (scene.state.gameScore >= scene.state.randomTasks.length) {
          scene.scene.stop('RegexScene');
          scene.scene.launch('WinScene', {
            ...scene.state,
            socket: scene.socket,
          });
          scene.finalTime = scene.initialTime;
          scene.beginTimer = false;
        }
      });

      //update leaderboard scores for everyone
      this.socket.on('updateLeaderboard', function (serverScores) {
        scene.state.scores = serverScores;
        console.log('update Leaderboard:', scene.state.scores);
      });

      //Was trying to decide whether or not to make this a group. Since they have unique tasks associated with them, I decided not to but would be down to change in the future to keep it DRY
      this.controlPanelLeft = new ControlPanel(
        this,
        200,
        200,
        'controlPanelLeft'
      );

      this.controlPanelRight = new ControlPanel(
        this,
        580,
        400,
        'controlPanelRight'
      );

      this.socket.on('setInactive', function (controlPanel) {
        if (controlPanel === 'left') {
          scene.controlPanelLeft.disableInteractive();
          scene.controlPanelLeft.setTint(0xd86969);
        } else if (controlPanel === 'right') {
          scene.controlPanelRight.disableInteractive();
          scene.controlPanelRight.setTint(0xd86969);
        }
      });

      // click on control panels and Regex Scene will launch
      this.controlPanelLeft.on('pointerdown', () => {
        this.scene.launch('RegexScene', {
          ...scene.state,
          randomTask: scene.state.randomTasks[0],
          socket: scene.socket,
        });
        scene.socket.emit('disablePanel', {
          controlPanel: 'left',
          roomKey: scene.state.roomKey,
        });
      });

      this.controlPanelRight.on('pointerdown', () => {
        this.scene.launch('RegexScene', {
          ...scene.state,
          randomTask: scene.state.randomTasks[1],
          socket: scene.socket,
        });
        scene.socket.emit('disablePanel', {
          controlPanel: 'right',
          roomKey: scene.state.roomKey,
        });
      });

      //TIMER
      this.initialTime = 120;
      this.timerLabel = this.add.text(
        680,
        16,
        this.formatTime(this.initialTime),
        {
          fontSize: '32px',
          fill: '#ffffff',
        }
      );

      scene.startText = scene.add.text(400, 300, 'START', {
        fill: '#000000',
        fontSize: '20px',
        fontStyle: 'bold',
      });
      scene.startText.setVisible(false);

      this.socket.on('destroyButton', function () {
        scene.startText.destroy();
      });

      this.socket.on('startTimer', function () {
        scene.beginTimer = Date.now();
      });
    } catch (error) {
      console.error(error);
    }
  }

  update(time) {
    const scene = this;
    if (this.astronaut) {
      if (this.cursors.left.isDown) {
        this.astronaut.setVelocityX(-150);
      } else if (this.cursors.right.isDown) {
        this.astronaut.setVelocityX(150);
      } else if (this.cursors.up.isDown) {
        this.astronaut.setVelocityY(-150);
      } else if (this.cursors.down.isDown) {
        this.astronaut.setVelocityY(150);
      } else {
        this.astronaut.setVelocity(0);
      }

      this.physics.world.wrap(this.astronaut, 5);

      // emit player movement
      var x = this.astronaut.x;
      var y = this.astronaut.y;
      if (
        this.astronaut.oldPosition &&
        (x !== this.astronaut.oldPosition.x ||
          y !== this.astronaut.oldPosition.y)
      ) {
        this.socket.emit('playerMovement', {
          x: this.astronaut.x,
          y: this.astronaut.y,
          roomKey: scene.state.roomKey,
        });
      }

      // save old position data
      this.astronaut.oldPosition = {
        x: this.astronaut.x,
        y: this.astronaut.y,
        rotation: this.astronaut.rotation,
      };
    }

    if (this.state.numPlayers >= 2 && this.startClickable === true) {
      this.startClickable = false;
      scene.waitingText.setVisible(false);
      this.startText.setVisible(true);
      this.startText.setInteractive();
      this.startText.on('pointerdown', () => {
        scene.socket.emit('startGame', scene.state.roomKey);
      });
    }
    if (this.beginTimer) {
      this.countdown();
    }
    scene.socket.on('activatePanels', function () {
      scene.controlPanelLeft.setInteractive();
      scene.controlPanelRight.setInteractive();
    });
  }

  addPlayer(scene, playerInfo) {
    scene.astronaut = scene.physics.add
      .image(playerInfo.x, playerInfo.y, 'astronaut')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === 'blue') {
      scene.astronaut.setTint(0x2796a5);
    } else {
      scene.astronaut.setTint(0xd86969);
    }
    scene.astronaut.setDrag(100);
    scene.astronaut.setAngularDrag(100);
    scene.astronaut.setMaxVelocity(200);
  }

  addOtherPlayers(scene, playerInfo) {
    const otherPlayer = scene.add
      .sprite(playerInfo.x, playerInfo.y, 'astronaut')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x2796a5);
    } else {
      otherPlayer.setTint(0xd86969);
    }
    otherPlayer.playerId = playerInfo.playerId;
    scene.otherPlayers.add(otherPlayer);
  }

  formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var partInSeconds = seconds % 60;
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    return `${minutes}:${partInSeconds}`;
  }
  countdown() {
    const scene = this;
    const currentTime = Date.now();
    const secondsPassed = currentTime - this.beginTimer;

    if (secondsPassed > 999) {
      this.initialTime -= 1;

      this.socket.emit('sendTime', this.initialTime);

      this.timerLabel.setText(this.formatTime(this.initialTime));
      if (this.initialTime === 10) {
        this.timerLabel.setStyle({ fill: '#ff0000' });
      }
      this.beginTimer = currentTime;
      if (this.initialTime === 0) {
        this.beginTimer = false;
        this.scene.stop('RegexScene');
        this.scene.launch('LoseScene', {
          ...scene.state,
          socket: scene.socket,
        });
      }
    }
  }
}
