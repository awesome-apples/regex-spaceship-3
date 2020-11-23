import "phaser";
import axios from "axios";

export default class FinishTitle extends Phaser.Scene {
  constructor() {
    super("FinishTitle");
    this.charts = [];
  }

  preload() {
    this.load.image("finished", "assets/titleScreens/finish.png");
  }

  async getCharts() {
    try {
      if (game.config.usernameOne) {
        await this.sendChart();
      }
      const { data } = await axios.get("/api/topchart/single");
      this.charts = data;
      console.log("got charts ----->", this.charts);
    } catch (err) {
      console.error(err);
    }
  }

  async sendChart() {
    try {
      await axios.post("/api/topchart", {
        username: game.config.usernameOne,
        points: game.config.points,
        time: Math.round(game.config.playerTime),
        style: "single",
        score: Math.round(game.config.playerTime) - game.config.points,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async create() {
    await this.getCharts();

    this.add.image(400, 300, "finished").setScale(0.9);

    this.wonText = this.add.text(400, 75, `Winner!`, {
      fontSize: 56,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.wonText.setOrigin(0.5);
    this.wonText.setScrollFactor(0);

    this.finalScore = this.add.text(
      400,
      170,
      `Final score! points: ${game.config.points}, time: ${Math.round(
        game.config.playerTime
      )}`,
      {
        fontSize: 36,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.finalScore.setOrigin(0.5);
    this.finalScore.setScrollFactor(0);

    this.wonText.setOrigin(0.5);
    this.wonText.setScrollFactor(0);

    this.playAgainButton = this.add.text(400, 500, "Play Again", {
      fontSize: 36,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.playAgainButton.setOrigin(0.5);
    this.playAgainButton.setScrollFactor(0);
    this.playAgainButton.setInteractive();
    this.playAgainButton.on("pointerover", () =>
      this.playAgainButton.setStyle({ fill: "#ff69b4" })
    );
    this.playAgainButton.on("pointerout", () =>
      this.playAgainButton.setStyle({ fill: "#39ff14" })
    );
    this.playAgainButton.on("pointerdown", () => {
      this.scene.start("MainScene");
      this.scene.stop("FinishTitle");
    });

    this.topCharts = this.add.text(400, 240, `TOP CHARTS`, {
      fontSize: 28,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.topCharts.setOrigin(0.5);
    this.topCharts.setScrollFactor(0);

    this.topChartOne = this.add.text(
      400,
      285,
      `1st: ${this.charts[0].user.username}, time: ${this.charts[0].time}, points: ${this.charts[0].points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#362DEC",
      }
    );
    this.topChartOne.setOrigin(0.5);
    this.topChartOne.setScrollFactor(0);

    this.topChartTwo = this.add.text(
      400,
      315,
      `2nd: ${this.charts[1].user.username}, time: ${this.charts[1].time}, points: ${this.charts[1].points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#362DEC",
      }
    );
    this.topChartTwo.setOrigin(0.5);
    this.topChartTwo.setScrollFactor(0);

    this.TopChartThree = this.add.text(
      400,
      345,
      `3rd: ${this.charts[2].user.username}, time: ${this.charts[2].time}, points: ${this.charts[2].points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#362DEC",
      }
    );
    this.TopChartThree.setOrigin(0.5);
    this.TopChartThree.setScrollFactor(0);

    this.TopChartFour = this.add.text(
      400,
      375,
      `4th: ${this.charts[3].user.username}, time: ${this.charts[3].time}, points: ${this.charts[3].points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#362DEC",
      }
    );
    this.TopChartFour.setOrigin(0.5);
    this.TopChartFour.setScrollFactor(0);

    this.TopChartFive = this.add.text(
      400,
      405,
      `5th: ${this.charts[4].user.username}, time: ${this.charts[4].time}, points: ${this.charts[4].points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#362DEC",
      }
    );
    this.TopChartFive.setOrigin(0.5);
    this.TopChartFive.setScrollFactor(0);
  }
}
