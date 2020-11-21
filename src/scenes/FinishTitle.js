import "phaser";
import axios from "axios";

export default class FinishTitle extends Phaser.Scene {
  constructor() {
    super("FinishTitle");
    this.charts = [];

    this.firstPlace = { name: "gamergirl12345", time: "500", points: "200" };
    this.secondPlace = { name: "gamertalk12345", time: "600", points: "190" };
    this.thirdPlace = { name: "leetcode12345", time: "720", points: "180" };
    this.fourthPlace = { name: "dgdfg12345", time: "740", points: "120" };
    this.fifthPlace = { name: "ddfjydrt2345", time: "730", points: "110" };
    this.sixthPlace = { name: "ddfdgsfgsfg", time: "740", points: "100" };
  }

  preload() {
    this.load.image("finished", "assets/titleScreens/finish.png");
  }

  async getCharts() {
    try {
      await this.sendChart();
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
        name: game.config.playerNameOne,
        points: game.config.points,
        time: Math.round(game.config.playerTime),
        style: "single",
        score: Math.round(game.config.playerTime) - game.config.points,
      });
    } catch (err) {
      console.error(err);
    }
  }

  create() {
    this.getCharts();

    this.add.image(400, 300, "finished").setScale(0.9);

    this.wonText = this.add.text(400, 150, `Winner!`, {
      fontSize: 56,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
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
    this.playAgainButton.on("pointerdown", () => this.scene.start("MainScene"));

    this.topCharts = this.add.text(400, 210, `TOP CHARTS`, {
      fontSize: 28,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.topCharts.setOrigin(0.5);
    this.topCharts.setScrollFactor(0);

    this.topChartOne = this.add.text(
      400,
      245,
      `1st: ${this.firstPlace.name}, time: ${this.firstPlace.time}, points: ${this.firstPlace.points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.topChartOne.setOrigin(0.5);
    this.topChartOne.setScrollFactor(0);

    this.topChartTwo = this.add.text(
      400,
      265,
      `2nd: ${this.secondPlace.name}, time: ${this.secondPlace.time}, points: ${this.secondPlace.points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.topChartTwo.setOrigin(0.5);
    this.topChartTwo.setScrollFactor(0);

    this.TopChartThree = this.add.text(
      400,
      285,
      `2nd: ${this.thirdPlace.name}, time: ${this.thirdPlace.time}, points: ${this.thirdPlace.points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.TopChartThree.setOrigin(0.5);
    this.TopChartThree.setScrollFactor(0);

    this.TopChartFour = this.add.text(
      400,
      305,
      `2nd: ${this.fourthPlace.name}, time: ${this.fourthPlace.time}, points: ${this.fourthPlace.points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.TopChartFour.setOrigin(0.5);
    this.TopChartFour.setScrollFactor(0);

    this.TopChartFive = this.add.text(
      400,
      325,
      `2nd: ${this.fifthPlace.name}, time: ${this.fifthPlace.time}, points: ${this.fifthPlace.points}`,
      {
        fontSize: 20,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.TopChartFive.setOrigin(0.5);
    this.TopChartFive.setScrollFactor(0);
  }
}
