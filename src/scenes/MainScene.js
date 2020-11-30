import Phaser from "phaser";
import ProgressBar from "../entity/progressBar";
import ControlPanel from "../entity/ControlPanel";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.state = { users: [], randomTasks: [], scores: [], gameScore: 0 };
    this.hasBeenSet = false;
    this.numPlayers = 0;
  }

  preload() {
    this.load.spritesheet(
      "progressBar",
      "assets/spritesheets/progressBar.png",
      {
        frameWidth: 300,
        frameHeight: 100,
      }
    );
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
    try {
      //SOCKET CONNECTIONS
      this.socket = io();
      this.otherPlayers = this.physics.add.group();
      console.log("this! ->>>", this);
      if (!this.hasBeenSet) {
        this.hasBeenSet = true;
        this.socket.on("setState", function (state) {
          const { users, randomTasks, scores, gameScore } = state;
          scene.state.users = users;
          scene.state.randomTasks = randomTasks;
          scene.state.scores = scores;
          scene.state.gameScore = gameScore;
          console.log("SET STATE", state);
        });
      }
      console.log("scene on mainscene", scene);
      console.log("scene random tasks length", this.state.randomTasks.length);
      console.log("random tasks without the length", this.state.randomTasks);

      this.socket.on("updateState", function (serverState) {
        scene.state = serverState;
        console.log("UPDATE STATE", scene.state);
      });

      this.socket.on("currentPlayers", function (arg) {
        const { players, numPlayers } = arg;
        scene.numPlayers = numPlayers;
        console.log("NUMPLAYERS", scene.numPlayers);
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
        console.log("NEW PLAYER< NUM PLAYERS", scene.numPlayers);
        if (!scene.timerHasBegun) {
          scene.timerHasBegun = true;
          scene.countdownEvent = scene.time.addEvent({
            delay: 1000,
            callback: scene.countdown,
            callbackScope: scene,
            loop: true,
          });
        }
      });

      if (this.numPlayers >= 2) {
        scene.startText = scene.add.text(400, 300, "START", {
          fill: "#000000",
          fontSize: "20px",
          fontStyle: "bold",
        });
        scene.startText.setInteractive();
        scene.startText.on("pointerdown", () => {
          scene.startButton();
        });
      }

      this.socket.on("disconnected", function (arg) {
        const { playerId, numPlayers } = arg;
        scene.numPlayers = numPlayers;
        console.log("PLAYER DELETED NE NUMPLAYERS", scene.numPlayers);
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

      this.socket.on("scoreUpdate", function (score) {
        scene.state.gameScore = score;
        if (scene.state.gameScore >= 2) {
          scene.scene.state("WinScene");
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
          this.scene.launch("RegexScene");
        }
      });

      // not working :(
      // this.physics.add.collider(this.astronaut, this.controlPanelLeft);
      // this.physics.add.collider(this.astronaut, this.controlPanelRight);

      //Progress Bar
      this.progressText = this.add.text(30, 16, "Tasks Completed", {
        fontSize: "20px",
        fill: "#ffffff",
      });

      this.tasks = [
        { problem: "beep", solution: "bop", completed: false },
        { problem: "beep", solution: "bop", completed: false },
      ];
      this.tasksCompleted = 0;
      //hey Adria :))
      //call store.dispatch(fetchTasks) to populate this array
      //write a func for when a task is completed that changes that tasks 'completed' property to true and increments the this.tasksCompleted, should also socket.emit('taskCompleted')
      //write a socket that listens for 'taskCompleted' and updates the progress tracker for all players

      //I wrote a progress tracker entity and got an asset that has empty and green bars
      //my intention was to change one bar to green each time a task was completed
      //You can implement whatever you want feel free to scrap the asset and the entity i think its kinda ugly anyway
      this.progressBar = this.physics.add.staticGroup({
        classType: ProgressBar,
      });

      for (var i = 0; i < this.tasks.length; i++) {
        let x = 100 + i * 130;
        let y = 50;

        this.progressBar.create(x, y, "progressBar").setScale(0.5);
      }

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
    if (this.initialTime === 11) {
      this.timerLabel.setStyle({ fill: "#ff0000" });
    }
    if (this.initialTime === 1) {
      this.countdownEvent.paused = true;
    }
    this.initialTime -= 1;
    this.timerLabel.setText(this.formatTime(this.initialTime));
    if (this.initialTime === 0) {
      //bring up game over scene here
    }
  }
  startButton() {
    scene.socket.emit("createTasks");
    //load random tasks
    //already handles with sockets: emits tasks to the socket server, socket server to everyone

    //start the timer

    //make start button go away
    scene.startText.destroy();
  }
}
