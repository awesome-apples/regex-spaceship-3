import Phaser from "phaser";
import axios from "axios";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.login = this.login.bind(this);
  }

  preload() {
    this.load.html("nameform", "assets/text/nameform.html");
    this.load.html("loginform", "assets/text/loginform.html");
    this.load.image("splash", "assets/splash.png");
    this.load.image("button", "assets/buttons/1.png");
    this.load.image("button22", "assets/buttons/22.png");
  }

  async login(username, password) {
    try {
      const user = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  create() {
    const scene = this;
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

    // helloButton.on("pointerdown", () => {
    //   this.scene.start("FgScene");
    //   this.scene.stop("MainScene");
    // });

    helloButton.on("pointerdown", () => {
      this.scene.start("FinishTitle");
      this.scene.stop("MainScene");
    });

    var text = this.add.text(300, 10, "Please enter your name", {
      color: "white",
      fontSize: "20px ",
    });

    var element = this.add
      .dom(400, 310)
      .createFromCache("loginform")
      .setScale(0.75);
    // element.setOrigin(0.45);

    element.addListener("click");

    element.on("click", async function (event) {
      if (event.target.name === "loginButton") {
        var username = this.getChildByName("username");
        var password = this.getChildByName("password");

        const { data } = await scene.login(username.value, password.value);
        console.log("USER ---->", data);
        //  Have they entered anything?
        if (username.value !== "" && password.value !== "" && data.username) {
          //axios requests
          //auth/login
          console.log("INSIDE IF STATEMENT");
          game.config.usernameOne = username.value;

          //  Turn off the click events
          this.removeListener("click");

          //  Hide the login element
          this.setVisible(false);

          //  Populate the text with whatever they typed in
          text.setText("welcome " + username.value);
        }
        // else {
        //   //  Flash the prompt
        //   this.scene.tweens.add({
        //     targets: text,
        //     alpha: 0.2,
        //     duration: 250,
        //     ease: "Power3",
        //     yoyo: true,
        //   });
        // }
      }
    });
  }
}
