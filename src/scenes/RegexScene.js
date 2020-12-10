import Phaser from "phaser";

export default class RegexScene extends Phaser.Scene {
  constructor() {
    super("RegexScene");
    this.state = {};
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

    const keyObj = scene.input.keyboard.addKey("enter");
    keyObj.enabled = false;

    try {
      scene.graphics = scene.add.image(400, 300, "computer");
      scene.promptPopup = scene.add.image(270, 295, "popup").setScale(1.05, 2);
      scene.inputPopup = scene.add.image(540, 230, "popup");
      scene.outputPopup = scene.add.image(460, 400, "popup").setScale(1.5, 1);

      // PROMPT TEXT
      scene.add.text(155, 145, "Error! Must be resolved!", {
        fill: "#00ff00",
        fontSize: "14px",
        fontStyle: "bold",
      });

      // TASK PROBLEM TEXT
      scene.add.text(
        155,
        170,
        `${scene.randomTask.problem}, ${scene.randomTask.string}`,
        {
          fill: "#00ff00",
          fontSize: "12px",
          fontStyle: "bold",
          align: "left",
          wordWrap: { width: 240, height: 445, useAdvancedWrap: true },
        }
      );

      // INPUT AREA
      scene.add.text(428, 152, "Input", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
      });
      scene.inputElement = scene.add.dom(597, 264).createFromCache("taskform");

      // OUTPUT AREA
      scene.add.text(290, 323, "Output", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
      });

      //RETURN BUTTON
      scene.returnContainer = scene.add.rexRoundRectangle(
        175,
        502,
        80,
        25,
        5,
        0xfa8128
      );
      scene.returnText = scene.add.text(147, 493, "Return", {
        fill: "#000000",
        fontSize: "15px",
        fontStyle: "bold",
      });

      scene.returnContainer.setInteractive();
      scene.returnContainer.on("pointerover", () => {
        scene.returnContainer.setFillStyle(0xfaa562);
      });
      scene.returnContainer.on("pointerout", () => {
        scene.returnContainer.setFillStyle(0xfa8128);
      });
      scene.returnContainer.on("pointerdown", () => {
        scene.socket.emit("resumePhysics");
        scene.scene.stop("RegexScene");
      });

      // OUTPUT TEXT
      scene.outputText = scene.add.text(290, 340, "", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
        align: "left",
        wordWrap: { width: 450, height: 190, useAdvancedWrap: true },
      });
      scene.outputText.setVisible(false);

      // CORRECT TEXT
      scene.isCorrect = scene.add.text(350, 490, "Correct", {
        fill: "#00ff00",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });

      // INCORRECT TEXT
      scene.isIncorrect = scene.add.text(320, 490, "Incorrect", {
        fill: "#ff0000",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });
      scene.isCorrect.setVisible(false);
      scene.isIncorrect.setVisible(false);

      // TIME BONUS
      scene.timeBonus = 0;
      scene.socket.on("sendTimeToRegex", function (time) {
        scene.timeBonus = time;
      });

      // SUBMIT BUTTON
      scene.submitContainer = scene.add.rexRoundRectangle(
        620,
        502,
        80,
        25,
        5,
        0xa06deb
      );
      scene.submitText = scene.add.text(593, 493, "Submit", {
        fill: "#000000",
        fontSize: "15px",
        fontStyle: "bold",
      });

      scene.submitContainer.setInteractive();
      scene.submitContainer.on("pointerover", () => {
        scene.submitContainer.setFillStyle(0xaf8feb);
      });
      scene.submitContainer.on("pointerout", () => {
        scene.submitContainer.setFillStyle(0xa06deb);
      });
      scene.submitContainer.on("pointerdown", () => {
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
            scene.socket.emit("disablePanel", {
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

      //old submit button
      // scene.submitButton = scene.add.text(570, 490, "Submit", {
      //   fill: "#00ff00",
      //   fontSize: "30px",
      //   fontStyle: "bold",
      // });
      // scene.submitButton.setInteractive();

      // scene.submitButton.on("pointerdown", () => {
      //   const inputText = scene.inputElement.getChildByName("code");
      //   scene.isCorrect.setVisible(false);
      //   scene.isIncorrect.setVisible(false);

      //   if (inputText.value !== "") {
      //     scene.output = scene.handleInput(
      //       scene,
      //       inputText.value,
      //       scene.randomTask
      //     );
      //     scene.outputText.setText(scene.output.text);
      //     scene.outputText.setVisible(true);

      //     if (scene.output.win) {
      //       scene.isCorrect.setVisible(true);
      //       scene.socket.emit("scoreUpdate", {
      //         scoreObj: {
      //           points: 50,
      //           timeBonus: scene.timeBonus,
      //         },
      //         roomKey: scene.roomKey,
      //       });
      //       scene.submitButton.disableInteractive();
      //       scene.socket.emit("disablePanel", {
      //         controlPanel: scene.controlPanel,
      //         roomKey: scene.roomKey,
      //       });
      //       scene.socket.emit("completedTask", { roomKey: scene.roomKey });
      //     } else {
      //       scene.isIncorrect.setVisible(true);
      //       scene.socket.emit("scoreUpdate", {
      //         scoreObj: { points: -5 },
      //         roomKey: scene.roomKey,
      //       });
      //     }
      //   }
      // });
    } catch (err) {
      next(err);
    }
  }
  // PROCESS INPUT TEXT
  handleInput(scene, input, randomTask) {
    const gFlag = /g$/;

    const flag = input.match(gFlag);
    const modified = input.replace(/\/|g$/g, "");

    let regex = "";

    if (flag === null) {
      regex = new RegExp(modified);
    } else {
      regex = new RegExp(modified, flag);
    }

    let result = false;
    if (randomTask.category === "search") {
      result = scene.searchValidator(regex, randomTask);
    } else if (randomTask.category === "replace") {
      result = scene.replaceValidator(regex, randomTask);
    } else if (randomTask.category === "match") {
      result = scene.matchValidator(regex, randomTask);
    } else if (randomTask.category === "count") {
      result = scene.countValidator(regex, randomTask);
    }
    return {
      text: `expected: ${randomTask.expectedOutput}\nyours: ${result.output}`,
      win: result.correct,
    };
  }
  // VALIDATORS
  matchValidator(regex, randomTask) {
    let output;
    if (randomTask.string.match(regex)) {
      output = randomTask.string.match(regex).join(", ");
    } else {
      output = null;
    }
    const correct = randomTask.expectedOutput === output;
    return { correct, output };
  }

  searchValidator(regex, randomTask) {
    const output = randomTask.string.search(regex);
    const correct = randomTask.expectedOutput === output.toString();
    return { correct, output };
  }

  replaceValidator(regex, randomTask) {
    const callbackFunction = eval(randomTask.callback);
    const output = randomTask.string.replace(regex, callbackFunction);
    const correct = randomTask.expectedOutput === output;
    return { correct, output };
  }

  countValidator(regex, randomTask) {
    if (randomTask.string.match(regex)) {
      const output = randomTask.string.match(regex).length;
      const correct = randomTask.expectedOutput === output.toString();
      return { correct, output };
    } else {
      return { correct: false, output: "null" };
    }
  }
}
