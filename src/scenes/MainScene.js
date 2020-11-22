import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.html("nameform", "assets/text/nameform.html");
    this.load.image("splash", "assets/splash.png");
    this.load.image("button", "assets/buttons/1.png");
    this.load.image("button22", "assets/buttons/22.png");
  }

  create() {
    game.config.health = 100;
    game.config.points = 0;
    game.config.beginTime = new Date().getTime() / 1000;
    game.config.playerTime = 0;
    this.add.image(400, 300, "splash").setScale(2.5);
    const helloButton = this.add.image(400, 300, "button").setScale(0.25);
    helloButton.setInteractive();
    const helloButtonTwo = this.add.image(400, 300, "button22").setScale(0.25);
    helloButtonTwo.visible = false;

    helloButton.on("pointerover", () => (helloButtonTwo.visible = true));
    helloButton.on("pointerout", () => (helloButtonTwo.visible = false));
    // helloButton.on("pointerdown", () => this.scene.start("FgScene"));
    helloButton.on("pointerdown", () => {
      this.scene.start("FgScene");
      this.scene.stop("MainScene");
    });

    var text = this.add.text(300, 10, "Please enter your name", {
      color: "white",
      fontSize: "20px ",
    });

    var element = this.add
      .dom(400, 100)
      .createFromCache("nameform")
      .setScale(0.75);
    // element.setOrigin(0.45);

    element.addListener("click");

    element.on("click", function (event) {
      if (event.target.name === "playButton") {
        var inputText = this.getChildByName("nameField");

        //  Have they entered anything?
        if (inputText.value !== "") {
          game.config.playerNameOne = inputText.value;

          //  Turn off the click events
          this.removeListener("click");

          //  Hide the login element
          this.setVisible(false);

          //  Populate the text with whatever they typed in
          text.setText("welcome " + inputText.value);
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: "Power3",
            yoyo: true,
          });
        }
      }
    });
  }
}
