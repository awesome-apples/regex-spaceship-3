import Phaser from "phaser";
import ProgressBar from "../entity/progressBar";
import ControlPanel from "../entity/ControlPanel";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.state = { users: [], randomTasks: [], scores: [], gameScore: 0 };
    this.hasBeenSet = false;
    this.startClickable = true;
    this.beginTimer = false;
    this.numPlayers = 0;
  }

  preload() {
    this.load.spritesheet("astronaut", "assets/spritesheets/astronaut3.png", {
      frameWidth: 29,
      frameHeight: 37,
    });
    this.load.image("controlPanelLeft", "assets/sprites/console_s.png");
    this.load.image("controlPanelRight", "assets/sprites/console_w.png");
    this.load.image("star", "assets/star_gold.png");
    this.load.image("mainroom", "assets/backgrounds/mainroom.png");
  }

  async create() {
    const scene = this;

    this.add.image(0, 0, "mainroom").setOrigin(0);

    //PROGRESS BAR
    this.progressText = this.add.text(30, 16, "Progress Tracker", {
      fontSize: "20px",
      fill: "#ffffff",
    });

    scene.progressBar = new ProgressBar(scene, 30, 50);

    try {
      //SOCKET CONNECTIONS
      this.socket = io();
      this.otherPlayers = this.physics.add.group();
      if (!this.hasBeenSet) {
        this.hasBeenSet = true;
        this.socket.on("setState", function (state) {
          const { users, randomTasks, scores, gameScore } = state;
          scene.state.users = users;
          scene.state.randomTasks = randomTasks;
          scene.state.scores = scores;
          scene.state.gameScore = gameScore;
        });
      }

      this.socket.on("updateState", function (serverState) {
        scene.state = serverState;
      });

      this.socket.on("currentPlayers", function (arg) {
        const { players, numPlayers } = arg;
        scene.numPlayers = numPlayers;
        Object.keys(players).forEach(function (id) {
          if (players[id].playerId === scene.socket.id) {
            scene.addPlayer(scene, players[id]);
          } else {
            scene.addOtherPlayers(scene, players[id]);
          }
        });
      });

      this.socket.on("newPlayer", function (arg) {
        const { playerInfo, numPlayers } = arg;
        scene.addOtherPlayers(scene, playerInfo);
        scene.numPlayers = numPlayers;
      });

      this.socket.on("disconnected", function (arg) {
        const { playerId, numPlayers } = arg;
        scene.numPlayers = numPlayers;
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy();
          }
        });
      });

      this.socket.on("playerMoved", function (playerInfo) {
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.setRotation(playerInfo.rotation);
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          }
        });
      });
      this.cursors = this.input.keyboard.createCursorKeys();

      this.socket.on("scoreUpdate", function (arg) {
        const { completedTaskId, gameScore } = arg;
        for (let i = 0; i < scene.state.randomTasks.length; i++) {
          if (scene.state.randomTasks[i].id === completedTaskId) {
            scene.state.randomTasks[i].completed = true;
          }
        }
        scene.progressBar.increase(gameScore - scene.state.gameScore);
        scene.state.gameScore = gameScore;
        if (scene.state.gameScore >= 2) {
          scene.scene.launch("WinScene");
        }
      });

      this.socket.on("starLocation", function (starLocation) {
        if (scene.star) scene.star.destroy();
        scene.star = scene.physics.add.image(
          starLocation.x,
          starLocation.y,
          "star"
        );
        scene.physics.add.overlap(
          scene.astronaut,
          scene.star,
          function () {
            this.socket.emit("starCollected");
          },
          null,
          scene
        );
      });

      //Was trying to decide whether or not to make this a group. Since they have unique tasks associated with them, I decided not to but would be down to change in the future to keep it DRY
      this.controlPanelLeft = new ControlPanel(
        this,
        200,
        200,
        "controlPanelLeft"
      );

      this.controlPanelRight = new ControlPanel(
        this,
        580,
        400,
        "controlPanelRight"
      );

      // click on control panels and Regex Scene will launch
      this.controlPanelLeft.setInteractive();
      this.controlPanelLeft.on("pointerdown", () => {
        var isSleep = this.scene.isSleeping("RegexScene");

        if (isSleep) {
          this.scene.wake("RegexScene");
        } else {
          this.scene.launch("RegexScene");
        }
      });

      this.controlPanelRight.setInteractive();
      this.controlPanelRight.on("pointerdown", () => {
        var isSleep = this.scene.isSleeping("RegexScene");

        if (isSleep) {
          this.scene.wake("RegexScene");
        } else {
          this.scene.launch("RegexScene", {
            users: this.state.users,
            randomTasks: this.state.randomTasks,
            scores: this.state.scores,
            gameScore: this.state.gameScore,
            socket: this.socket,
          });
        }
      });

      //TIMER
      this.initialTime = 120;
      this.timerLabel = this.add.text(
        680,
        16,
        this.formatTime(this.initialTime),
        {
          fontSize: "32px",
          fill: "#ffffff",
        }
      );

      scene.startText = scene.add.text(400, 300, "START", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });
      scene.startText.setVisible(false);

      this.socket.on("destroyButton", function () {
        scene.startText.destroy();
      });

      this.socket.on("startTimer", function () {
        scene.beginTimer = Date.now();
      });
    } catch (error) {
      console.error(error);
    }
  }

  update(time) {
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
        this.socket.emit("playerMovement", {
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

    if (this.numPlayers >= 2 && this.startClickable === true) {
      this.startClickable = false;
      this.startText.setVisible(true);
      this.startText.setInteractive();
      this.startText.on("pointerdown", () => {
        this.startButton();
      });
    }

    if (this.beginTimer) {
      this.countdown();
    }
  }

  addPlayer(scene, playerInfo) {
    scene.astronaut = scene.physics.add
      .image(playerInfo.x, playerInfo.y, "astronaut")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === "blue") {
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
      .sprite(playerInfo.x, playerInfo.y, "astronaut")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    if (playerInfo.team === "blue") {
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
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    return `${minutes}:${partInSeconds}`;
  }
  countdown() {
    const currentTime = Date.now();
    const secondsPassed = currentTime - this.beginTimer;

    if (secondsPassed > 999) {
      this.initialTime -= 1;
      this.timerLabel.setText(this.formatTime(this.initialTime));
      if (this.initialTime === 10) {
        this.timerLabel.setStyle({ fill: "#ff0000" });
      }
      this.beginTimer = currentTime;
      if (this.initialTime === 0) {
        this.beginTimer = false;
        this.scene.launch("LoseScene");
      }
    }
  }
  startButton() {
    this.socket.emit("startGame");
  }
}
