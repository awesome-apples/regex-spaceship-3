import Phaser from 'phaser';
import axios from 'axios';
import store from '../store';
import ProgressBar from '../entity/progressBar';
import Timer from '../entity/Timer';
// import io from "socket.io-client";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.spritesheet(
      'progressBar',
      'assets/spritesheets/progressBar.png',
      {
        frameWidth: 300,
        frameHeight: 100,
      }
    );
    this.load.image('ship', 'assets/spaceShips_001.png');
    this.load.image('otherPlayer', 'assets/enemyBlack5.png');
    this.load.image('star', 'assets/star_gold.png');
    this.load.image('mainroom', 'assets/backgrounds/mainroom.png');
  }

  create() {
    var self = this;
    this.add.image(0, 0, 'mainroom').setOrigin(0);

    //Progress Bar
    this.progressText = this.add.text(30, 16, 'Tasks Completed', {
      fontSize: '20px',
      fill: '#ffffff',
    });

    this.tasks = [
      { problem: 'beep', solution: 'bop', completed: false },
      { problem: 'beep', solution: 'bop', completed: false },
    ];
    this.tasksCompleted = 0;
    //hey Adria :))
    //call store.dispatch(fetchTasks) to populate this array
    //write a func for when a task is completed that changes that tasks 'completed' property to true and increments the this.tasksCompleted, should also socket.emit('taskCompleted')
    //write a socket that listens for 'taskCompleted' and updates the progress tracker for all players

    //I wrote a progress tracker entity and got an asset that has empty and green bars
    //my intention was to change one bar to green each time a task was completed
    //You can implement whatever you want feel free to scrap the asset and the entity i think its kinda ugly anyway
    this.progressBar = this.physics.add.staticGroup({ classType: ProgressBar });

    for (var i = 0; i < this.tasks.length; i++) {
      let x = 100 + i * 130;
      let y = 50;

      this.progressBar.create(x, y, 'progressBar').setScale(0.5);
    }

    //Socket Connections
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === self.socket.id) {
          self.addPlayer(self, players[id]);
        } else {
          self.addOtherPlayers(self, players[id]);
        }
      });
    });
    this.socket.on('newPlayer', function (playerInfo) {
      self.addOtherPlayers(self, playerInfo);
    });
    this.socket.on('disconnected', function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });
    this.socket.on('playerMoved', function (playerInfo) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setRotation(playerInfo.rotation);
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    // this.blueScoreText = this.add.text(16, 16, '', {
    //   fontSize: '32px',
    //   fill: '#0000FF',
    // });
    // this.redScoreText = this.add.text(584, 16, '', {
    //   fontSize: '32px',
    //   fill: '#FF0000',
    // });

    // this.socket.on('scoreUpdate', function (scores) {
    //   self.blueScoreText.setText('Blue: ' + scores.blue);
    //   self.redScoreText.setText('Red: ' + scores.red);
    // });
    this.socket.on('starLocation', function (starLocation) {
      if (self.star) self.star.destroy();
      self.star = self.physics.add.image(
        starLocation.x,
        starLocation.y,
        'star'
      );
      self.physics.add.overlap(
        self.ship,
        self.star,
        function () {
          this.socket.emit('starCollected');
        },
        null,
        self
      );
    });

    this.timerLabel = this.add.text(680, 16, '120s', {
      fontSize: '32px',
      fill: '#ffffff',
    });
    this.socket.on('countdown', function (time) {
      const timeRemaining = 120 - time;
      self.timerLabel.setText(timeRemaining.toFixed(0) + 's');
    });
  }

  update(time) {
    this.socket.emit('countdown', time);
    if (this.ship) {
      if (this.cursors.left.isDown) {
        this.ship.setVelocityX(-150);
      } else if (this.cursors.right.isDown) {
        this.ship.setVelocityX(150);
      } else if (this.cursors.up.isDown) {
        this.ship.setVelocityY(-150);
      } else if (this.cursors.down.isDown) {
        this.ship.setVelocityY(150);
      } else {
        this.ship.setVelocity(0);
      }

      this.physics.world.wrap(this.ship, 5);

      // emit player movement
      var x = this.ship.x;
      var y = this.ship.y;
      if (
        this.ship.oldPosition &&
        (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y)
      ) {
        this.socket.emit('playerMovement', {
          x: this.ship.x,
          y: this.ship.y,
        });
      }

      // save old position data
      this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation,
      };
    }
  }

  addPlayer(self, playerInfo) {
    self.ship = self.physics.add
      .image(playerInfo.x, playerInfo.y, 'ship')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      self.ship.setTint(0x0000ff);
    } else {
      self.ship.setTint(0xff0000);
    }
    self.ship.setDrag(100);
    self.ship.setAngularDrag(100);
    self.ship.setMaxVelocity(200);
  }

  addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add
      .sprite(playerInfo.x, playerInfo.y, 'otherPlayer')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x0000ff);
    } else {
      otherPlayer.setTint(0xff0000);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
  }

  handleCountdownFinished() {
    //write function that takes to losing screen when finished
  }
}
