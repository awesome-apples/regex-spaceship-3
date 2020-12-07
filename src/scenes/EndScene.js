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
  }

  async create() {
    const scene = this;

    try {
      //sockets

      scene.popUp = scene.add.graphics();
      scene.textBox = scene.add.graphics();

      // for popup window
      scene.popUp.lineStyle(1, 0xffffff);
      scene.popUp.fillStyle(0xffffff, 0.5);

      // for boxes
      scene.textBox.lineStyle(1, 0xffffff);
      scene.textBox.fillStyle(0x000000, 1);

      // popup window
      scene.popUp.strokeRect(25, 25, 750, 550);
      scene.popUp.fillRect(25, 25, 750, 550);

      // you win box
      scene.textBox.strokeRect(240, 50, 320, 65);
      scene.textBox.fillRect(240, 50, 320, 65);
      scene.outcome = scene.add.text(310, 65, "", {
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

      // popup specs: 25, 25, 750, 550
      // popup specs: x, y, width, height

      // leaderboard box
      scene.textBox.strokeRect(425, 150, 325, 400);
      scene.textBox.fillRect(425, 150, 325, 400);
      scene.add.text(485, 170, "Final Scores", {
        fill: "#ffffff",
        fontSize: "30px",
        fontStyle: "bold",
      });

      scene.textBox.strokeRect(50, 200, 325, 200);
      scene.textBox.fillRect(50, 200, 325, 200);
      scene.add.text(90, 220, "Enter your name: ", {
        fill: "#ffffff",
        fontSize: "25px",
        fontStyle: "bold",
      });

      scene.inputElement = scene.add.dom(215, 300).createFromCache("nameform");

      scene.submitButton = scene.add.text(165, 350, "Submit", {
        fill: "#ffffff",
        fontSize: "25px",
        fontStyle: "bold",
      });
      scene.submitButton.setInteractive();

      scene.submitButton.on("pointerdown", () => {
        if (scene.scores[scene.socket.id].name.length < 1) {
          const inputText = document.getElementsByName("username")[0].value;
          scene.scores[scene.socket.id].name = inputText;

          console.log("playerInfo", scene.scores[scene.socket.id]);
          scene.socket.emit("sendScores", {
            playerInfo: scene.scores[scene.socket.id],
            roomKey: scene.roomKey,
          });

          document.getElementsByName("username")[0].value = "";
        }
      });

      scene.scoreDisplay = scene.add.text(445, 210, "", {
        fill: "#ffffff",
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
