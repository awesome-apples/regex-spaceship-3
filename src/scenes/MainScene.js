import Phaser from 'phaser';
import axios from 'axios';
import store from '../store';
import ProgressBar from '../entity/progressBar';
import Timer from '../entity/Timer';
import ControlPanel from '../entity/ControlPanel';
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
    this.load.spritesheet('astronaut', 'assets/spritesheets/astronaut3.png', {
      frameWidth: 29,
      frameHeight: 37,
    });
    this.load.image('controlPanelLeft', 'assets/sprites/console_s.png');
    this.load.image('controlPanelRight', 'assets/sprites/console_w.png');
    this.load.image('star', 'assets/star_gold.png');
    this.load.image('mainroom', 'assets/backgrounds/mainroom.png');
  }

  create() {
    var self = this;
    this.add.image(0, 0, 'mainroom').setOrigin(0);

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

    // click on control panels and Regex Scene will launch
    this.controlPanelLeft.setInteractive();
    this.controlPanelLeft.on('pointerdown', () => {
      var isSleep = this.scene.isSleeping("RegexScene");

      if (isSleep) this.scene.wake("RegexScene");
      else this.scene.launch("RegexScene");      
    });

    this.controlPanelRight.setInteractive();
    this.controlPanelRight.on('pointerdown', () => {
      var isSleep = this.scene.isSleeping("RegexScene");

      if (isSleep) this.scene.wake("RegexScene");
      else this.scene.launch("RegexScene");      
    });

    // not working :(
    // this.physics.add.collider(this.astronaut, this.controlPanelLeft);
    // this.physics.add.collider(this.astronaut, this.controlPanelRight);

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
        self.astronaut,
        self.star,
        function () {
          this.socket.emit('starCollected');
        },
        null,
        self
      );
    });
    
    //TIMER
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
        });
      }

      // save old position data
      this.astronaut.oldPosition = {
        x: this.astronaut.x,
        y: this.astronaut.y,
        rotation: this.astronaut.rotation,
      };
    }
  }

  addPlayer(self, playerInfo) {
    self.astronaut = self.physics.add
      .image(playerInfo.x, playerInfo.y, 'astronaut')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === 'blue') {
      self.astronaut.setTint(0x2796a5);
    } else {
      self.astronaut.setTint(0xd86969);
    }
    self.astronaut.setDrag(100);
    self.astronaut.setAngularDrag(100);
    self.astronaut.setMaxVelocity(200);
  }

  addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.add
      .sprite(playerInfo.x, playerInfo.y, 'astronaut')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === 'blue') {
      otherPlayer.setTint(0x2796a5);
    } else {
      otherPlayer.setTint(0xd86969);
    }
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
  }

  handleCountdownFinished() {
    //write function that takes to losing screen when finished
  }
}
