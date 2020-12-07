import Phaser from "phaser";
import ScoreBoard from "../entity/ScoreBoard";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
    this.state = {};
  }

  init(data) {
    this.users = data.users;
    this.randomTasks = data.randomTasks;
    this.scores = data.scores;
    this.gameScore = data.gameScore;
    this.socket = data.socket;
    this.roomKey = data.roomKey;
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
      scene.add.text(310, 65, "YOU WIN", {
        fill: "#00ff00",
        fontSize: "40px",
        fontStyle: "bold",
      });

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

      let count = 0;

      scene.submitButton.on("pointerdown", () => {
        while (count < 1) {
          const inputText = document.getElementsByName("username")[0].value;
          scene.scores[scene.socket.id].name = inputText;

          console.log("playerInfo", scene.scores[scene.socket.id]);
          scene.socket.emit("sendScores", {
            playerInfo: scene.scores[scene.socket.id],
            roomKey: scene.roomKey,
          });

          document.getElementsByName("username")[0].value = "";

          count++;
        }
      });

      scene.socket.on("displayScores", function (updatedScores) {
        let playersInfo = [];
        console.log("playersInfo", playersInfo);
        for (let key in updatedScores) {
          if (updatedScores[key].name.length > 0) {
            playersInfo.push(
              `${updatedScores[key].name}   ${updatedScores[key].points}`
            );
            playersInfo.push("\n");
          }
        }
        scene.add.text(445, 210, playersInfo, {
          fill: "#ffffff",
          fontSize: "20px",
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}
