import Phaser from "phaser";
import ProgressBar from "../entity/progressBar";
import ControlPanel from "../entity/ControlPanel";
import Speaker from "../entity/Speaker";

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
    this.joined = false;
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.spritesheet("astronaut", "assets/spritesheets/astronaut3.png", {
      frameWidth: 29,
      frameHeight: 37,
    });

    this.load.image("lavatory", "assets/sprites/lavatory.png");
    this.load.image("birthdayList", "assets/sprites/birthdayList.png");
    this.load.image("cockpit", "assets/sprites/console_w.png");
    this.load.image("cargoHold", "assets/sprites/cargoHold1.png");
    this.load.image("engineRoom", "assets/sprites/engineroom/engineroom2.png");
    this.load.image("vendingMachine", "assets/sprites/vendingMachine.png");
    this.load.image("medBay", "assets/sprites/medbay/desk.png");
    this.load.image("mainroom", "assets/backgrounds/mainroom.png");
    this.load.image("tiles", "assets/spritesheets/scifi_space_rpg_tiles.png");
    this.load.tilemapTiledJSON("map", "../assets/map/spaceship.json");
    this.load.atlas(
      "atlas",
      "../assets/atlas/atlas.png",
      "../assets/atlas/atlas.json"
    );

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {});

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  async create() {
    const scene = this;

    // initialize enter key
    const keyObj = scene.input.keyboard.addKey("enter");
    keyObj.enabled = false;

    // tilemap
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("spaceship", "tiles");
    this.belowLayer = this.map.createStaticLayer(
      "Below Player",
      this.tileset,
      0,
      0
    );
    this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
    this.wallLayer = this.map.createStaticLayer(
      "Wall Stuff",
      this.tileset,
      0,
      0
    );
    this.aboveLayer = this.map.createStaticLayer(
      "Above Player",
      this.tileset,
      0,
      0
    );
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.wallLayer.setCollisionByProperty({ collides: true });
    this.SpawnPoint = this.map.getObjectLayer("Spawn Point")["objects"];

    try {
      //CREATE SOCKET CONNECTION
      this.socket = io();
      // LAUNCH WAITING ROOM
      scene.scene.launch("WaitingRoom", { socket: scene.socket });
      this.otherPlayers = this.physics.add.group();
      if (!this.hasBeenSet) {
        this.hasBeenSet = true;
        // JOINED ROOM - SET STATE
        this.socket.on("setState", function (state) {
          const {
            roomKey,
            users,
            randomTasks,
            scores,
            gameScore,
            allRandomTasks,
          } = state;

          // STATE
          scene.state.allRandomTasks = allRandomTasks;
          scene.state.roomKey = roomKey;
          scene.state.users = users;
          scene.randomTasks = randomTasks;
          scene.state.scores = scores;
          scene.state.gameScore = gameScore;

          // ROOM KEY
          scene.roomkeyText = scene.add.text(
            30,
            78,
            `Room Key: ${scene.state.roomKey}`,
            {
              fontSize: "20px",
              fill: "#00ff00",
            }
          );
          scene.roomkeyText.setScrollFactor(0);

          //INSTRUCTIONS BUTTON
          scene.instructionsButton = scene.add
            .dom(
              680,
              550,
              "button",
              "width: 100px; height: 25px",
              "instructions"
            )
            .setOrigin(0);
          scene.instructionsButton.setInteractive();
          scene.instructionsButton.on("pointerdown", () => {
            scene.scene.launch("Instructions");
          });
          scene.instructionsButton.setScrollFactor(0);

          //TIMER
          scene.initialTime = 120;
          scene.timerLabel = scene.add.text(
            680,
            16,
            scene.formatTime(scene.initialTime),
            {
              fontSize: "32px",
              fill: "#ffffff",
            }
          );
          scene.timerLabel.setScrollFactor(0);

          //PROGRESS BAR
          scene.progressText = scene.add.text(30, 16, "Progress Tracker", {
            fontSize: "20px",
            fill: "#ffffff",
          });
          scene.progressText.setScrollFactor(0);
          scene.progressBar = new ProgressBar(scene, 30, 50);

          //ASSIGNED TASK LIST GRAPHICS RECTANGLE
          scene.taskListSqr = scene.add.graphics();
          scene.taskListSqr.lineStyle(1, 0xffffff);
          scene.taskListSqr.fillStyle(0xffffff, 0.5);
          scene.taskListSqr.strokeRect(30, 500, 265, 80);
          scene.taskListSqr.fillRect(30, 500, 265, 80);
          scene.taskListSqr.setScrollFactor(0);

          //ASSIGNED TASK LIST TEXT
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
              text: scene.add
                .text(35, y + 25 * i, taskPhrase, {
                  fontSize: "12px",
                  fill: "#000000",
                  fontStyle: "bold",
                })
                .setScrollFactor(0),
              location: scene.randomTasks[i].location,
            });
          }
          //SET WAITING FOR MORE PLAYERS TEXT
          scene.waitingText.setVisible(true);
        });
      }

      // CREATE WAITING FOR MORE PLAYERS TEXT
      // (avoids setvisible loading error)
      scene.waitingText = scene.add
        .text(400, 393, "Waiting for more players to join", {
          fontSize: "20px",
          fill: "#ff0000",
        })
        .setScrollFactor(0)
        .setOrigin(0.5);
      scene.waitingText.setVisible(false);

      this.socket.on("updateState", function (serverState) {
        scene.state = serverState;
        scene.progressBar.changeTaskAmount(scene.state.allRandomTasks.length);
      });

      // PLAYERS
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

      this.socket.on("playerMoved", function (playerInfo) {
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            const oldX = otherPlayer.x;
            const oldY = otherPlayer.y;
            otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            if (oldX < playerInfo.x) {
              otherPlayer.anims.play("misa-right-walk", true);
            } else if (oldX > playerInfo.x) {
              otherPlayer.anims.play("misa-left-walk", true);
            } else if (oldY < playerInfo.y) {
              otherPlayer.anims.play("misa-front-walk", true);
            } else if (oldY > playerInfo.y) {
              otherPlayer.anims.play("misa-back-walk", true);
            }
          }
        });
      });

      this.socket.on("otherPlayerStopped", function (playerInfo) {
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.anims.stop(null, true);
          }
        });
      });
      this.cursors = this.input.keyboard.createCursorKeys();

      // DISCONNECT
      this.socket.on("disconnected", function (arg) {
        const { playerId, numPlayers } = arg;
        scene.state.numPlayers = numPlayers;
        scene.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy();
          }
        });
      });

      // PROGRESS BAR UPDATE
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

      //LEADERBOARD SCORES UPDATE
      this.socket.on("updateLeaderboard", function (serverScores) {
        scene.state.scores = serverScores;
      });

      // CONTROL PANELS
      this.controlPanelGroup = this.physics.add.staticGroup({
        classType: ControlPanel,
      });
      this.controlPanelLavatory = this.controlPanelGroup
        .create(2470, 2444, "lavatory")
        .setScale(0.3);
      this.controlPanelBirthdayList = this.controlPanelGroup
        .create(1486, 1350, "birthdayList")
        .setScale(0.2);
      this.controlPanelCockpit = this.controlPanelGroup.create(
        3614,
        1952,
        "cockpit"
      );
      this.controlPanelCargoHold = this.controlPanelGroup.create(
        2460,
        1462,
        "cargoHold"
      );
      this.controlPanelEngineRoom = this.controlPanelGroup
        .create(715, 1878, "engineRoom")
        .setScale(0.8);
      this.controlPanelVendingMachine = this.controlPanelGroup.create(
        1310,
        1300,
        "vendingMachine"
      );
      this.controlPanelMedbay = this.controlPanelGroup
        .create(1936, 2160, "medBay")
        .setScale(0.8);

      // CONTROL PANELS: INTERACTIVITY
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

      // TINT ASSIGNED PANELS
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

      // IF TASK COMPLETED
      this.socket.on("setInactive", function (controlPanel) {
        // MARK COMPLETE
        for (let i = 0; i < scene.tasksText.length; i++) {
          let currentTask = scene.tasksText[i];
          if (currentTask.location === controlPanel) {
            currentTask.text.setText("Completed");
          }
        }
        // CLEAR PANEL TINT
        switch (controlPanel) {
          case "vendingMachine":
            scene.controlPanelVendingMachine.disableInteractive();
            scene.controlPanelVendingMachine.clearTint();
            scene.vendingMachineStatus = true;
            break;
          case "birthdayList":
            scene.controlPanelBirthdayList.disableInteractive();
            scene.controlPanelBirthdayList.clearTint();
            scene.birthdayListStatus = true;
            break;
          case "engineRoom":
            scene.controlPanelEngineRoom.disableInteractive();
            scene.controlPanelEngineRoom.clearTint();
            scene.engineRoomStatus = true;
            break;
          case "cargoHold":
            scene.controlPanelCargoHold.disableInteractive();
            scene.controlPanelCargoHold.clearTint();
            scene.cargoHoldStatus = true;
            break;
          case "cockpit":
            scene.controlPanelCockpit.disableInteractive();
            scene.controlPanelCockpit.clearTint();
            scene.cockpitStatus = true;
            break;
          case "lavatory":
            scene.controlPanelLavatory.disableInteractive();
            scene.controlPanelLavatory.clearTint();
            scene.lavatoryStatus = true;
            break;
          case "medBay":
            scene.controlPanelMedbay.disableInteractive();
            scene.controlPanelMedbay.clearTint();
            scene.medbayStatus = true;
            break;
          default:
            console.log("no control panel matches to set inactive");
        }
      });

      // START GAME FUNCTIONALITY:

      // START BUTTON
      scene.startButton = scene.add
        .dom(400, 350, "button", "width: 70px; height: 25px", "START")
        .setOrigin(0.5)
        .setScrollFactor(0);
      scene.startButton.setVisible(false);
      this.socket.on("destroyButton", function () {
        scene.startButton.destroy();
      });

      // START TIMER
      this.socket.on("startTimer", function () {
        scene.beginTimer = Date.now();
      });
    } catch (error) {
      console.error(error);
    }

    // RESUME PHYSICS: CLOSED REGEXSCENE
    scene.socket.on("mainSceneResumePhysics", function () {
      scene.physics.resume();
    });

    // ASTRONAUT
    this.astronaut = this.physics.add.sprite(1, 1, "atlas", "misa-front");
    this.astronaut.setVisible(false);

    // ANIMATIONS
    this.anims.create({
      key: "misa-left-walk",
      frames: this.anims.generateFrameNames("atlas", {
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "misa-right-walk",
      frames: this.anims.generateFrameNames("atlas", {
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "misa-front-walk",
      frames: this.anims.generateFrameNames("atlas", {
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "misa-back-walk",
      frames: this.anims.generateFrameNames("atlas", {
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  //UPDATE
  update(time) {
    const scene = this;
    //MOVEMENT
    if (this.astronaut) {
      const speed = 175;
      const prevVelocity = this.astronaut.body.velocity.clone();
      // Stop any previous movement from the last frame
      this.astronaut.body.setVelocity(0);
      // Horizontal movement
      if (this.cursors.left.isDown) {
        this.astronaut.body.setVelocityX(-speed);
      } else if (this.cursors.right.isDown) {
        this.astronaut.body.setVelocityX(speed);
      }
      // Vertical movement
      if (this.cursors.up.isDown) {
        this.astronaut.body.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        this.astronaut.body.setVelocityY(speed);
      }
      // Normalize and scale the velocity so that astronaut can't move faster along a diagonal
      this.astronaut.body.velocity.normalize().scale(speed);
      // Update the animation last and give left/right animations precedence over up/down animations
      if (this.cursors.left.isDown) {
        this.astronaut.anims.play("misa-left-walk", true);
      } else if (this.cursors.right.isDown) {
        this.astronaut.anims.play("misa-right-walk", true);
      } else if (this.cursors.up.isDown) {
        this.astronaut.anims.play("misa-back-walk", true);
      } else if (this.cursors.down.isDown) {
        this.astronaut.anims.play("misa-front-walk", true);
      } else {
        this.astronaut.anims.stop(null, true);
        // If we were moving, pick and idle frame to use
        if (prevVelocity.x < 0) this.astronaut.setTexture("atlas", "misa-left");
        else if (prevVelocity.x > 0)
          this.astronaut.setTexture("atlas", "misa-right");
        else if (prevVelocity.y < 0)
          this.astronaut.setTexture("atlas", "misa-back");
        else if (prevVelocity.y > 0)
          this.astronaut.setTexture("atlas", "misa-front");
      }
      // emit player movement
      var x = this.astronaut.x;
      var y = this.astronaut.y;
      if (
        this.astronaut.oldPosition &&
        (x !== this.astronaut.oldPosition.x ||
          y !== this.astronaut.oldPosition.y)
      ) {
        this.moving = true;
        this.socket.emit("playerMovement", {
          x: this.astronaut.x,
          y: this.astronaut.y,
          roomKey: scene.state.roomKey,
        });
        // emit player stopped
      } else if (this.joined && this.moving) {
        this.moving = false;
        this.socket.emit("playerStopped", {
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

    //CONTROL PANEL OVERLAPS
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

    //CONTROL PANEL: NOT OVERLAPPED
    scene.checkOverlap(scene, scene.astronaut, scene.controlPanelBirthdayList);
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

    // START BUTTON VISIBLE
    if (this.state.numPlayers >= 3 && this.startClickable === true) {
      this.startClickable = false;
      this.waitingText.setVisible(false);
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
      switch (controlPanel.texture.key) {
        case "vendingMachine":
          if (!this.vendingMachineStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        case "birthdayList":
          if (!this.birthdayListStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
        case "engineRoom":
          if (!this.engineRoomStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        case "cargoHold":
          if (!this.cargoHoldStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        case "cockpit":
          if (!this.cockpitStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        case "lavatory":
          if (!this.lavatoryStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        case "medBay":
          if (!this.medbayStatus) {
            controlPanel.setTint(0xbdef83);
            controlPanel.setInteractive();
          }
          break;
        default:
          console.log("error activating panel");
      }
    }
  }

  deactivateControlPanel(controlPanel) {
    switch (controlPanel.texture.key) {
      case "vendingMachine":
        if (!this.vendingMachineStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      case "birthdayList":
        if (!this.birthdayListStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
      case "engineRoom":
        if (!this.engineRoomStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      case "cargoHold":
        if (!this.cargoHoldStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      case "cockpit":
        if (!this.cockpitStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      case "lavatory":
        if (!this.lavatoryStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      case "medBay":
        if (!this.medbayStatus) {
          controlPanel.setTint(0xb2b037);
          controlPanel.disableInteractive();
        }
        break;
      default:
    }
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
    scene.joined = true;
    scene.astronaut = scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, "atlas", "misa-front")
      .setOrigin(0.5, 0.5)
      .setSize(30, 40)
      .setOffset(0, 24);

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
    scene.physics.add.collider(scene.astronaut, this.worldLayer);
    // scene.createAnims(scene);

    scene.camera = scene.cameras.main;
    scene.camera.startFollow(scene.astronaut);
    scene.camera.setBounds(
      0,
      0,
      scene.map.widthInPixels,
      scene.map.heightInPixels
    );
  }

  addOtherPlayers(scene, playerInfo) {
    const otherPlayer = scene.add.sprite(
      playerInfo.x,
      playerInfo.y,
      "atlas",
      "misa-front"
    );
    // .setOrigin(0.5, 0.5)
    // .setSize(30, 40)
    // .setOffset(0, 24);
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
        scene.physics.pause();
        this.scene.launch("EndScene", {
          ...scene.state,
          socket: scene.socket,
          didWin: false,
        });
      }
    }
  }
}
