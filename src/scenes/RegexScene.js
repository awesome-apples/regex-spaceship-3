import Phaser from "phaser";

export default class RegexScene extends Phaser.Scene {
  constructor() {
    super("RegexScene");
    this.state = {};
    // this.randomTask = {
    //   problem:
    //     "Matching optional characters: Try writing a pattern that uses the optionality metacharacter to match only the lines where one or more files were found.",
    //   matchArray: ["1 file found?", "2 files found?", "24 files found?"],
    //   skipArray: ["No files found."],
    //   completed: false,
    //   category: "one",
    // };
  }

  init(data) {
    this.roomKey = data.roomKey;
    this.randomTasks = data.randomTasks;
    this.randomTask = data.randomTask;
    this.gameScore = data.gameScore;
    this.players = data.players;
    this.numPlayers = data.numPlayers;
    this.socket = data.socket;
    this.controlPanel = data.controlPanel;
  }

  preload() {
    this.load.html("taskform", "assets/text/taskform.html");
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("popup", "assets/backgrounds/singlepopup.png");
  }

  async create() {
    const scene = this;

    // console.log('random tasks altogether in this scene', this.randomTasks);
    // console.log('random task in this scene !!', this.randomTask);
    //get an emition of the persons random task from their socket
    //assign random task to this.randomTask

    try {
      //sockets

      // scene.graphics = scene.add.graphics();
      scene.graphics = scene.add.image(400, 300, "computer");
      // scene.graphics2 = scene.add.graphics();
      scene.promptPopup = scene.add.image(270, 295, "popup").setScale(1.05, 2);
      scene.inputPopup = scene.add.image(540, 230, "popup");
      scene.outputPopup = scene.add.image(460, 400, "popup").setScale(1.5, 1);

      // for popup window
      // scene.graphics.lineStyle(1, 0xffffff);
      // scene.graphics.fillStyle(0xffffff, 0.5);

      // for boxes
      // scene.graphics2.lineStyle(1, 0xffffff);
      // scene.graphics2.fillStyle(0xffffff, 1);

      // popup window
      // scene.graphics.strokeRect(25, 75, 750, 500);
      // scene.graphics.fillRect(25, 75, 750, 500);

      // regex problem prompt
      // scene.graphics2.strokeRect(50, 100, 325, 425);
      // scene.graphics2.fillRect(50, 100, 325, 425);
      scene.add.text(155, 145, "Error!! Must be resolved!", {
        fill: "#00ff00",
        fontSize: "14px",
        fontStyle: "bold",
      });

      scene.add.text(
        155,
        170,
        `${scene.randomTask.problem}
        Matches: ${scene.randomTask.matchArray.map(
          (string) => `
        ${string}`
        )}
        Skips:${scene.randomTask.skipArray.map(
          (string) => `
        ${string}`
        )}`,
        {
          fill: "#00ff00",
          fontSize: "12px",
          fontStyle: "bold",
          align: "left",
          wordWrap: { width: 240, height: 445, useAdvancedWrap: true },
        }
      );

      // input area
      // scene.graphics2.strokeRect(425, 100, 325, 200);
      // scene.graphics2.fillRect(425, 100, 325, 200);
      scene.add.text(428, 152, "Input", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
      });
      scene.inputElement = scene.add.dom(597, 264).createFromCache("taskform");

      // output area
      // scene.graphics2.strokeRect(425, 350, 325, 175);
      // scene.graphics2.fillRect(425, 350, 325, 175);

      scene.add.text(290, 323, "Output", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
      });

      scene.exit = scene.add.text(130, 490, "Return", {
        fill: "#00ff00",
        fontSize: "30px",
        fontStyle: "bold",
      });
      scene.exit.setInteractive();
      scene.exit.on("pointerdown", () => {
        scene.scene.stop("RegexScene");
      });

      scene.outputText = scene.add.text(290, 340, "", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
        align: "left",
        wordWrap: { width: 450, height: 190, useAdvancedWrap: true },
      });
      scene.outputText.setVisible(false);

      scene.isCorrect = scene.add.text(350, 490, "Correct", {
        fill: "#00ff00",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });
      scene.isIncorrect = scene.add.text(320, 490, "Incorrect", {
        fill: "#ff0000",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });
      scene.isCorrect.setVisible(false);
      scene.isIncorrect.setVisible(false);

      scene.timeBonus = 0;
      scene.socket.on("sendTimeToRegex", function (time) {
        scene.timeBonus = time;
      });

      scene.submitButton = scene.add.text(570, 490, "Submit", {
        fill: "#00ff00",
        fontSize: "30px",
        fontStyle: "bold",
      });
      scene.submitButton.setInteractive();

      scene.submitButton.on("pointerdown", () => {
        const inputText = scene.inputElement.getChildByName("code");
        scene.isCorrect.setVisible(false);
        scene.isIncorrect.setVisible(false);

        if (inputText.value !== "") {
          scene.output = scene.handleInput(
            scene,
            inputText.value,
            scene.randomTask
          );
          scene.outputText.setText(scene.output.text);
          scene.outputText.setVisible(true);

          if (scene.output.win) {
            scene.isCorrect.setVisible(true);
            scene.socket.emit("scoreUpdate", {
              scoreObj: {
                points: 50,
                timeBonus: scene.timeBonus,
              },
              roomKey: scene.roomKey,
            });
            scene.submitButton.disableInteractive();
            scene.socket.emit("disablePanelForAll", {
              controlPanel: scene.controlPanel,
              roomKey: scene.roomKey,
            });
            scene.socket.emit("completedTask", { roomKey: scene.roomKey });
          } else {
            scene.isIncorrect.setVisible(true);
            scene.socket.emit("scoreUpdate", {
              scoreObj: { points: -5 },
              roomKey: scene.roomKey,
            });
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleInput(scene, input, randomTask) {
    const regex = new RegExp(input);
    let result = false;
    if (randomTask.category === "one") {
      result = scene.validatorOne(regex, randomTask);
    } else if (randomTask.category === "two") {
      result = scene.validatorTwo(regex, randomTask);
    }
    return { text: `expected: potato\nyours: ${input}`, win: result };
  }

  validatorOne(regex, randomTask) {
    const matchResult = randomTask.matchArray.every((string) => {
      if (string.match(regex) === null) {
        return false;
      } else {
        return string.match(regex)[0] === string;
      }
    });
    const skipResult = randomTask.skipArray.every((string) => {
      if (string.match(regex) === null) {
        return true;
      } else {
        return string.match(regex)[0] !== string;
      }
    });
    const result = matchResult === true && skipResult === true;

    return result;
  }
  validatorTwo(regex, randomTask) {
    //waiting for category two tasks and algorithm
    const result = false;
    return result;
  }
}
