import Phaser from "phaser";
import ProgressBar from "../entity/progressBar";
import ControlPanel from "../entity/ControlPanel";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.state = {
      roomKey: "",
      gameScore: 0,
      scores: {},
      players: {},
      numPlayers: 0,
      gameStarted: false,
      allRandomTasks: [],
    };
    this.hasBeenSet = false;
    this.startClickable = true;
    this.beginTimer = false;
    this.randomTasks = [];
    this.overlapped = false;
  }

  preload() {
    this.load.spritesheet("astronaut", "assets/spritesheets/astronaut3.png", {
      frameWidth: 29,
      frameHeight: 37,
    });
    this.load.image("lavatory", "assets/sprites/lavatory.png");
    this.load.image("birthdayList", "assets/sprites/birthdayList.png");
    this.load.image("cockpit", "assets/sprites/console_w.png");
    this.load.image("cargoHold", "assets/sprites/cargoHold1.png");
    this.load.image("engineRoom", "assets/sprites/console_w.png");
    this.load.image("vendingMachine", "assets/sprites/vendingMachine.png");
    this.load.image("medBay", "assets/sprites/console_w.png");
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
      scene.scene.launch("WaitingRoom", { socket: scene.socket });
      this.otherPlayers = this.physics.add.group();
      if (!this.hasBeenSet) {
        this.hasBeenSet = true;

        this.socket.on("setState", function (state) {
          const {
            roomKey,
            users,
            randomTasks,
            scores,
            gameScore,
            allRandomTasks,
          } = state;
          scene.state.allRandomTasks = allRandomTasks;
          scene.state.roomKey = roomKey;
          scene.state.users = users;
          scene.randomTasks = randomTasks;
          scene.state.scores = scores;
          scene.state.gameScore = gameScore;
          scene.roomkeyText = scene.add.text(
            30,
            78,
            `Room Key: ${scene.state.roomKey}`,
            {
              fontSize: "20px",
              fill: "#00ff00",
            }
          );
          //Task List Text
          scene.tasksText = [];
          for (let i = 0; i < scene.randomTasks.length; i++) {
            const y = 508;
            let taskPhrase;
            switch (scene.randomTasks[i].nickname) {
              case "Recount Inventory":
                taskPhrase = "Recount Inventory in the Cargo Hold";
                break;
              case "Sterilize Samples":
                taskPhrase = "Sterilize Samples in the Med Bay";
                break;
              case "Reorganize Snacks":
                taskPhrase = "Reorganize Snacks in the Break Room";
                break;
              case "Check Birthday List":
                taskPhrase = "Check Birthdays in the Break Room";
                break;
              case "Debug Engine":
                taskPhrase = "Debug Engine in the Engine Room";
                break;
              case "Plunge Toilets":
                taskPhrase = "Plunge Toilets List in the Lavatory";
                break;
              case "Unscramble Maps":
                taskPhrase = "Unscramble Maps List in the Cockpit";
                break;
            }
            scene.tasksText.push({
              text: scene.add.text(35, y + 25 * i, taskPhrase, {
                fontSize: "12px",
                fill: "#000000",
                fontStyle: "bold",
              }),
              location: scene.randomTasks[i].location,
            });
          }
          console.log("sscene.state.scores in setstate", scene.state.scores);
          console.log("scene.state.roomkey in set state", scene.state.roomKey);
          console.log("randomtasks on main", scene.randomTasks);
          console.log("state on main", scene.state);
          scene.waitingText = scene.add
            .text(400, 300, "Waiting for more players to join", {
              fontSize: "20px",
              fill: "#ff0000",
            })
            .setOrigin(0.5);
        });
      }

      this.socket.on("updateState", function (serverState) {
        scene.state = serverState;
        scene.progressBar.changeTaskAmount(scene.state.allRandomTasks.length);
      });

      this.socket.on("currentPlayers", function (arg) {
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

      this.socket.on("newPlayer", function (arg) {
        const { playerInfo, numPlayers } = arg;
        scene.addOtherPlayers(scene, playerInfo);
        scene.state.numPlayers = numPlayers;
      });

      this.socket.on("disconnected", function (arg) {
        const { playerId, numPlayers } = arg;
        scene.state.numPlayers = numPlayers;
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

      this.socket.on("progressUpdate", function (arg) {
        const { gameScore } = arg;
        scene.progressBar.increase(gameScore - scene.state.gameScore);
        scene.state.gameScore = gameScore;
        if (scene.state.gameScore >= scene.state.allRandomTasks.length) {
          scene.scene.stop("RegexScene");
          scene.scene.launch("EndScene", {
            ...scene.state,
            socket: scene.socket,
            didWin: true,
          });
          scene.finalTime = scene.initialTime;
          scene.beginTimer = false;
        }
      });

      //update leaderboard scores for everyone
      this.socket.on("updateLeaderboard", function (serverScores) {
        scene.state.scores = serverScores;
        console.log("update Leaderboard:", scene.state.scores);
      });

      //Was trying to decide whether or not to make this a group. Since they have unique tasks associated with them, I decided not to but would be down to change in the future to keep it DRY

      //make a control panel group for physics
      this.controlPanelGroup = this.physics.add.staticGroup({
        classType: ControlPanel,
      });

      this.controlPanelLavatory = this.controlPanelGroup
        .create(35, 200, "lavatory")
        .setScale(0.3);

      this.controlPanelBirthdayList = this.controlPanelGroup
        .create(435, 55, "birthdayList")
        .setScale(0.2);

      this.controlPanelCockpit = this.controlPanelGroup.create(
        300,
        200,
        "cockpit"
      );

      this.controlPanelCargoHold = this.controlPanelGroup.create(
        400,
        200,
        "cargoHold"
      );

      this.controlPanelEngineRoom = this.controlPanelGroup.create(
        500,
        200,
        "engineRoom"
      );

      this.controlPanelVendingMachine = this.controlPanelGroup.create(
        600,
        200,
        "vendingMachine"
      );

      this.controlPanelMedbay = this.controlPanelGroup.create(
        700,
        200,
        "medBay"
      );

      this.socket.on("setInactive", function (controlPanel) {
        console.log("inside setInactive listener");
        for (let i = 0; i < scene.tasksText.length; i++) {
          let currentTask = scene.tasksText[i];
          //NEED TO FIND A WAY TO PASS LOCATION
          if (currentTask.location === controlPanel) {
            console.log("inside color changing if");
            currentTask.text.setText("Completed");
          }
        }
        switch (controlPanel) {
          case "vendingMachine":
            scene.controlPanelVendingMachine.disableInteractive();
            break;
          case "birthdayList":
            scene.controlPanelBirthdayList.disableInteractive();
            break;
          case "engineRoom":
            scene.controlPanelEngineRoom.disableInteractive();
            break;
          case "cargoHold":
            scene.controlPanelCargoHold.disableInteractive();
            break;
          case "cockpit":
            scene.controlPanelCockpit.disableInteractive();
            break;
          case "lavatory":
            scene.controlPanelLavatory.disableInteractive();
            break;
          case "medBay":
            scene.controlPanelMedbay.disableInteractive();
            break;
          default:
            console.log("no control panel matches to set inactive");
        }
      });

      scene.socket.on("activatePanels", function () {
        scene.randomTasks.forEach((task) => {
          switch (task.location) {
            case "vendingMachine":
              scene.controlPanelVendingMachine.setTint(0xb2b037);
              break;
            case "birthdayList":
              scene.controlPanelBirthdayList.setTint(0xb2b037);
              break;
            case "engineRoom":
              scene.controlPanelEngineRoom.setTint(0xb2b037);
              break;
            case "cargoHold":
              scene.controlPanelCargoHold.setTint(0xb2b037);
              break;
            case "cockpit":
              scene.controlPanelCockpit.setTint(0xb2b037);
              break;
            case "lavatory":
              scene.controlPanelLavatory.setTint(0xb2b037);
              break;
            case "medBay":
              scene.controlPanelMedbay.setTint(0xb2b037);
              break;
            default:
              console.log("no control panel matches to set active");
          }
        });
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
      scene.startButton = scene.add
        .dom(400, 300, "button", "width: 70px; height: 25px", "START")
        .setOrigin(0.5);
      scene.startButton.setVisible(false);

      this.socket.on("destroyButton", function () {
        scene.startButton.destroy();
      });

      this.socket.on("startTimer", function () {
        scene.beginTimer = Date.now();
      });
      scene.instructionsButton = scene.add
        .dom(680, 550, "button", "width: 100px; height: 25px", "instructions")
        .setOrigin(0);
      this.instructionsButton.setInteractive();
      this.instructionsButton.on("pointerdown", () => {
        scene.scene.launch("Instructions");
      });
    } catch (error) {
      console.error(error);
    }

    // this.astronaut = this.physics.add.image(1, 1, "astronaut");
    // this.astronaut.setVisible(false);

    scene.controlPanelVendingMachine.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "vendingMachine",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "vendingMachine"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });
    scene.controlPanelBirthdayList.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "birthdayList",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "birthdayList"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });

    scene.controlPanelEngineRoom.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "engineRoom",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "engineRoom"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });

    scene.controlPanelCargoHold.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "cargoHold",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "cargoHold"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });
    scene.controlPanelCockpit.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "cockpit",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "cockpit"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });
    scene.controlPanelLavatory.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "lavatory",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "lavatory"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });
    scene.controlPanelMedbay.on("pointerdown", () => {
      scene.scene.launch("RegexScene", {
        ...scene.state,
        controlPanel: "medBay",
        randomTask: scene.randomTasks.find(
          (task) => task.location === "medBay"
        ),
        socket: scene.socket,
      });
      scene.physics.pause();
    });
    scene.socket.on("mainSceneResumePhysics", function () {
      scene.physics.resume();
    });
    //Task List Square
    scene.taskListSqr = scene.add.graphics();
    scene.taskListSqr.lineStyle(1, 0xffffff);
    scene.taskListSqr.fillStyle(0xffffff, 0.5);
    scene.taskListSqr.strokeRect(30, 500, 265, 80);
    scene.taskListSqr.fillRect(30, 500, 265, 80);
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

      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelBirthdayList,
        scene.highlightControlPanel,
        null,
        scene
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelCargoHold,
        scene.highlightControlPanel,
        null,
        this
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelCockpit,
        scene.highlightControlPanel,
        null,
        this
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelEngineRoom,
        scene.highlightControlPanel,
        null,
        this
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelLavatory,
        scene.highlightControlPanel,
        null,
        this
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelMedbay,
        scene.highlightControlPanel,
        null,
        this
      );
      this.physics.add.overlap(
        scene.astronaut,
        scene.controlPanelVendingMachine,
        scene.highlightControlPanel,
        null,
        this
      );

      //check to see if they are no longer overlapping
      scene.checkOverlap(
        scene,
        scene.astronaut,
        scene.controlPanelBirthdayList
      );
      scene.checkOverlap(scene, scene.astronaut, scene.controlPanelCargoHold);
      scene.checkOverlap(scene, scene.astronaut, scene.controlPanelCockpit);
      scene.checkOverlap(scene, scene.astronaut, scene.controlPanelEngineRoom);
      scene.checkOverlap(scene, scene.astronaut, scene.controlPanelLavatory);
      scene.checkOverlap(scene, scene.astronaut, scene.controlPanelMedbay);
      scene.checkOverlap(
        scene,
        scene.astronaut,
        scene.controlPanelVendingMachine
      );

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

    if (this.state.numPlayers >= 3 && this.startClickable === true) {
      this.startClickable = false;
      scene.waitingText.setVisible(false);
      this.startButton.setVisible(true);
      this.startButton.setInteractive();
      this.startButton.on("pointerdown", () => {
        scene.socket.emit("startGame", scene.state.roomKey);
      });
    }
    if (this.beginTimer) {
      this.countdown();
    }
  }

  highlightControlPanel(astronaut, controlPanel) {
    if (
      this.state.gameStarted &&
      this.randomTasks.some(
        (task) => task.location === controlPanel.texture.key
      )
    ) {
      controlPanel.setTint(0xbdef83);
      controlPanel.setInteractive();
    }
  }

  deactivateControlPanel(controlPanel) {
    controlPanel.setTint(0xb2b037);
    controlPanel.disableInteractive();
  }

  checkOverlap(scene, player, controlPanel) {
    if (
      this.state.gameStarted &&
      this.randomTasks.some(
        (task) => task.location === controlPanel.texture.key
      )
    ) {
      const boundsPlayer = player.getBounds();
      const boundsPanel = controlPanel.getBounds();
      if (
        !Phaser.Geom.Intersects.RectangleToRectangle(boundsPlayer, boundsPanel)
      ) {
        scene.deactivateControlPanel(controlPanel);
      }
    }
  }

  addPlayer(scene, playerInfo) {
    scene.astronaut = scene.physics.add
      .image(playerInfo.x, playerInfo.y, "astronaut")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    switch (playerInfo.team) {
      case "red":
        scene.astronaut.setTint(0xd86969);
        break;
      case "blue":
        scene.astronaut.setTint(0x2796a5);
        break;
      case "green":
        scene.astronaut.setTint(0xabe0a2);
        break;
      default:
        console.log("there was an error assigning player colors");
    }
    scene.astronaut.setVisible(true);
    scene.astronaut.setDrag(100);
    scene.astronaut.setAngularDrag(100);
    scene.astronaut.setMaxVelocity(200);
  }

  addOtherPlayers(scene, playerInfo) {
    const otherPlayer = scene.add
      .sprite(playerInfo.x, playerInfo.y, "astronaut")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(43.5, 55.5);
    switch (playerInfo.team) {
      case "red":
        otherPlayer.setTint(0xd86969);
        break;
      case "blue":
        otherPlayer.setTint(0x2796a5);
        break;
      case "green":
        otherPlayer.setTint(0xabe0a2);
        break;
      default:
        console.log("there was an error assigning player colors");
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
    const scene = this;
    const currentTime = Date.now();
    const secondsPassed = currentTime - this.beginTimer;

    if (secondsPassed > 999) {
      this.initialTime -= 1;

      this.socket.emit("sendTime", this.initialTime);

      this.timerLabel.setText(this.formatTime(this.initialTime));
      if (this.initialTime === 10) {
        this.timerLabel.setStyle({ fill: "#ff0000" });
      }
      this.beginTimer = currentTime;
      if (this.initialTime === 0) {
        this.beginTimer = false;
        this.scene.stop("RegexScene");
        this.scene.launch("EndScene", {
          ...scene.state,
          socket: scene.socket,
          didWin: false,
        });
      }
    }
  }
}
