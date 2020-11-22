import Phaser from "phaser";
import axios from "axios";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.login = this.login.bind(this);
  }

  preload() {
    // this.load.html("nameform", "assets/text/nameform.html");
    // this.load.html("loginform", "assets/text/loginform.html");
    this.load.html("loginform2", "assets/text/loginform2.html");
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

  async signup(username, password) {
    try {
      await axios.post("/api/users/signup", {
        username: username,
        password: password,
      });
      const user = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await axios.post("/auth/logout");
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

    // helloButton.on("pointerdown", () => {
    //   this.scene.start("FinishTitle");
    //   this.scene.stop("MainScene");
    // });

    if (game.config.login !== true) {
      var text = this.add.text(300, 10, "Please enter your name", {
        color: "white",
        fontSize: "20px ",
      });

      var element = this.add
        .dom(400, 115)
        .createFromCache("loginform2")
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
            game.config.login = true;
            //  Turn off the click events
            this.removeListener("click");

            //  Hide the login element
            this.setVisible(false);

            //  Populate the text with whatever they typed in
            text.setText("welcome " + username.value);

            var begintext = scene.add.text(410, 340, "Godspeed...", {
              color: "white",
              fontSize: "20px ",
            });

            begintext.setInteractive();
            begintext.on("pointerover", () =>
              begintext.setStyle({ fill: "#ff69b4" })
            );

            begintext.on("pointerout", () =>
              begintext.setStyle({ fill: "#ffffff" })
            );

            //you may enter
            helloButton.on("pointerdown", () => {
              scene.scene.start("FinishTitle");
              scene.scene.stop("MainScene");
            });

            var logouttext = scene.add.text(400, 550, "logout", {
              color: "white",
              fontSize: "20px ",
            });
            logouttext.setOrigin(0.5);
            logouttext.setInteractive();
            logouttext.on("pointerover", () =>
              logouttext.setStyle({ fill: "#ff69b4" })
            );
            logouttext.on("pointerout", () =>
              logouttext.setStyle({ fill: "#ffffff" })
            );
            logouttext.on("pointerdown", async () => {
              await scene.logout();
              game.config.login = false;
              scene.scene.start("MainScene");
            });
          }
        } else if (event.target.name === "signupButton") {
          var username = this.getChildByName("username2");
          var password = this.getChildByName("password2");

          const { data } = await scene.signup(username.value, password.value);
          console.log("USER ---->", data);
          //  Have they entered anything?
          if (username.value !== "" && password.value !== "" && data.username) {
            //axios requests
            //auth/login
            console.log("INSIDE IF STATEMENT");
            game.config.usernameOne = username.value;
            game.config.login = true;
            //  Turn off the click events
            this.removeListener("click");

            //  Hide the login element
            this.setVisible(false);

            //  Populate the text with whatever they typed in
            text.setText("welcome " + username.value);

            var begintext = scene.add.text(410, 340, "Godspeed...", {
              color: "white",
              fontSize: "20px ",
            });

            begintext.setInteractive();
            begintext.on("pointerover", () =>
              begintext.setStyle({ fill: "#ff69b4" })
            );

            begintext.on("pointerout", () =>
              begintext.setStyle({ fill: "#ffffff" })
            );

            //you may enter
            helloButton.on("pointerdown", () => {
              scene.scene.start("FinishTitle");
              scene.scene.stop("MainScene");
            });

            var logouttext = scene.add.text(400, 550, "logout", {
              color: "white",
              fontSize: "20px ",
            });
            logouttext.setOrigin(0.5);
            logouttext.setInteractive();
            logouttext.on("pointerover", () =>
              logouttext.setStyle({ fill: "#ff69b4" })
            );
            logouttext.on("pointerout", () =>
              logouttext.setStyle({ fill: "#ffffff" })
            );
            logouttext.on("pointerdown", async () => {
              await scene.logout();
              game.config.login = false;
              scene.scene.start("MainScene");
            });
          }
        }
      });
    } else {
      //  Populate the text with whatever they typed in
      var textwelcome = this.add.text(
        300,
        10,
        "welcome " + game.config.usernameOne,
        {
          color: "white",
          fontSize: "20px ",
        }
      );

      var begintext = scene.add.text(410, 340, "Godspeed...", {
        color: "white",
        fontSize: "20px ",
      });

      begintext.setInteractive();
      begintext.on("pointerover", () =>
        begintext.setStyle({ fill: "#ff69b4" })
      );

      begintext.on("pointerout", () => begintext.setStyle({ fill: "#ffffff" }));

      //you may enter
      helloButton.on("pointerdown", () => {
        scene.scene.start("FinishTitle");
        scene.scene.stop("MainScene");
      });

      var logouttext = this.add.text(400, 550, "logout", {
        color: "white",
        fontSize: "20px ",
      });
      logouttext.setOrigin(0.5);
      logouttext.setInteractive();
      logouttext.on("pointerover", () =>
        logouttext.setStyle({ fill: "#ff69b4" })
      );
      logouttext.on("pointerout", () =>
        logouttext.setStyle({ fill: "#ffffff" })
      );
      logouttext.on("pointerdown", async () => {
        await scene.logout();
        game.config.login = false;
        scene.scene.start("MainScene");
      });
    }
  }
}
