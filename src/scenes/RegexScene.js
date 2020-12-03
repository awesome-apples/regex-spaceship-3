import Phaser from "phaser";

export default class RegexScene extends Phaser.Scene {
  constructor() {
    super("RegexScene");
    this.state = {};
    this.randomTask = {
      problem:
        "Matching optional characters: Try writing a pattern that uses the optionality metacharacter to match only the lines where one or more files were found.",
      matchArray: ["1 file found?", "2 files found?", "24 files found?"],
      skipArray: ["No files found."],
      completed: false,
      category: "one",
    };
  }

  init(data) {
    this.users = data.users;
    this.randomTasks = data.randomTasks;
    this.scores = data.scores;
    this.gameScore = data.gameScore;
    this.socket = data.socket;
  }

  preload() {
    this.load.html("taskform", "assets/text/taskform.html");
  }

  async create() {
    const scene = this;

    //get an emition of the persons random task from their socket
    //assign random task to this.randomTask

    try {
      //sockets

      scene.graphics = scene.add.graphics();
      scene.graphics2 = scene.add.graphics();

      // for popup window
      scene.graphics.lineStyle(1, 0xffffff);
      scene.graphics.fillStyle(0xffffff, 0.5);

      // for boxes
      scene.graphics2.lineStyle(1, 0xffffff);
      scene.graphics2.fillStyle(0xffffff, 1);

      // popup window
      scene.graphics.strokeRect(25, 75, 750, 500);
      scene.graphics.fillRect(25, 75, 750, 500);

      // regex problem prompt
      scene.graphics2.strokeRect(50, 100, 325, 425);
      scene.graphics2.fillRect(50, 100, 325, 425);
      scene.add.text(53, 85, "Task Prompt", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });

      scene.promptArr = [
        scene.randomTask.problem,
        '\n\n',
        'Matches:',
        '\n',
        scene.randomTask.matchArray,
        '\n\n',
        'Skips:',
        '\n',
        scene.randomTask.skipArray,
      ]

      scene.promptArr2 = [scene.randomTask.problem, '\n\n', 'hello again', '\n\n', 'hello once more']

      scene.add.text(
        55,
        105,
        scene.promptArr2,
        {
          fill: "#000000",
          fontSize: "20px",
          fontStyle: "bold",
          align: "left",
          wordWrap: { width: 320, height: 445, useAdvancedWrap: true },
        }
      );
      
      // input area
      scene.graphics2.strokeRect(425, 100, 325, 200);
      scene.graphics2.fillRect(425, 100, 325, 200);
      scene.add.text(430, 85, "Input", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });
      scene.inputElement = scene.add.dom(587, 203).createFromCache("taskform");

      // output area
      scene.graphics2.strokeRect(425, 350, 325, 175);
      scene.graphics2.fillRect(425, 350, 325, 175);

      scene.add.text(430, 335, "Output", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
      });

      scene.exit = scene.add.text(55, 540, "Return", {
        fill: "#000000",
        fontSize: "30px",
        fontStyle: "bold",
      });
      scene.exit.setInteractive();
      scene.exit.on("pointerdown", () => {
        scene.scene.sleep("RegexScene");
      });

      scene.outputText = scene.add.text(430, 350, "temp", {
        fill: "#000000",
        fontSize: "20px",
        fontStyle: "bold",
        align: "left",
        wordWrap: { width: 320, height: 445, useAdvancedWrap: true },
      });
      scene.outputText.setVisible(false);

      scene.isCorrect = scene.add.text(320, 540, "Correct", {
        fill: "#00ff00",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });
      scene.isIncorrect = scene.add.text(320, 540, "Incorrect", {
        fill: "#ff0000",
        fontSize: "30px",
        fontStyle: "bold",
        boundsAlignH: "center",
      });
      scene.isCorrect.setVisible(false);
      scene.isIncorrect.setVisible(false);

      scene.submitButton = scene.add.text(642, 540, "Submit", {
        fill: "#000000",
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
            scene.socket.emit("completedTask");
          } else {
            scene.isIncorrect.setVisible(true);
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
