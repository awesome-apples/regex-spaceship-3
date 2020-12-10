import Phaser from "phaser";
import ScoreBoard from "../entity/ScoreBoard";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
    this.state = {};
  }

  init(data) {
    this.users = data.users;
    this.randomTasks = data.randomTasks;
    this.scores = data.scores;
    this.gameScore = data.gameScore;
    this.socket = data.socket;
    this.roomKey = data.roomKey;
    this.didWin = data.didWin;
  }

  preload() {
    this.load.html("nameform", "assets/text/nameform.html");
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("popup", "assets/backgrounds/singlepopup.png");
    this.load.audio("click", "audio/Button_Click.wav");
  }

  async create() {
    const scene = this;

    scene.click = scene.sound.add("click");

    try {
      scene.popUp = scene.add.image(400, 300, "computer");
      scene.textBoxWindowScores = scene.add
        .image(510, 315, "popup")
        .setScale(1.05, 2);
      scene.textBoxWindow = scene.add.image(280, 295, "popup");

      scene.outcome = scene.add.text(310, 80, "", {
        fill: "#00ff00",
        fontSize: "40px",
        fontStyle: "bold",
      });
      if (scene.didWin) {
        scene.outcome.setText("YOU WIN");
      } else {
        scene.outcome.setColor("#ff0000");
        scene.outcome.setText("YOU LOSE");
      }

      scene.add.text(393, 163, "Final Scores", {
        fill: "#00ff00",
        fontSize: "18px",
        fontStyle: "bold",
      });

      scene.add.text(170, 217, "Enter your name: ", {
        fill: "#00ff00",
        fontSize: "12px",
        fontStyle: "bold",
      });

      scene.inputElement = scene.add.dom(290, 300).createFromCache("nameform");

      // scene.submitButton = scene.add.text(280, 320, "Submit", {
      //   fill: "#00ff00",
      //   fontSize: "20px",
      //   fontStyle: "bold",
      // });

      scene.endSubmitContainer = scene.add.rexRoundRectangle(
        286,
        340,
        80,
        25,
        5,
        0x2fc1ff
      );
      scene.endSubmitText = scene.add.text(260, 333, "Submit", {
        fill: "#000000",
        fontSize: "15px",
        fontStyle: "bold",
      });

      scene.endSubmitContainer.setInteractive();
      scene.endSubmitContainer.on("pointerover", () => {
        scene.endSubmitContainer.setFillStyle(0x7ed5ff);
      });
      scene.endSubmitContainer.on("pointerout", () => {
        scene.endSubmitContainer.setFillStyle(0x2fc1ff);
      });

      scene.endSubmitContainer.on("pointerdown", () => {
        scene.click.play();
        if (scene.scores[scene.socket.id].name.length < 1) {
          const inputText = document.getElementsByName("username")[0].value;
          scene.scores[scene.socket.id].name = inputText;
          scene.socket.emit("sendScores", {
            playerInfo: scene.scores[scene.socket.id],
            roomKey: scene.roomKey,
          });

          document.getElementsByName("username")[0].value = "";
        }
      });

      scene.scoreDisplay = scene.add.text(410, 210, "", {
        fill: "#00ff00",
        fontSize: "20px",
      });

      scene.socket.on("displayScores", function (updatedScores) {
        let scoreArr = [];
        let playersInfo = [];

        for (let key in updatedScores) {
          if (updatedScores[key].name) scoreArr.push(updatedScores[key]);
        }

        scoreArr = scoreArr.sort(scene.compare);

        scoreArr.forEach((elem) => {
          playersInfo.push(`${elem.name}   ${elem.points}`);
          playersInfo.push("\n");
        });

        scene.scoreDisplay.setText(playersInfo);
      });

      scene.playAgain = scene.add.text(125, 475, "Play Again", {
        fill: "#000000",
        fontSize: "30px",
      });

      scene.playAgain.setInteractive();

      // scene.playAgain.on("pointerdown", () => {
      //   scene.scene.launch("WaitingRoom");
      //   scene.scene.remove("EndScene");
      //   scene.scene.remove("MainScene");
      //   scene.scene.remove("RegexScene");
      // });
    } catch (err) {
      console.error(err);
    }
  }

  compare(a, b) {
    const scoreA = a.points;
    const scoreB = b.points;

    let comparison = 0;
    if (scoreA < scoreB) {
      comparison = 1;
    } else if (scoreA > scoreB) {
      comparison = -1;
    }
    return comparison;
  }
}
