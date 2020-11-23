import Phaser from "phaser";
import axios from "axios";
import io from "socket.io-client";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.login = this.login.bind(this);
  }

  preload() {
    this.load.html("loginform2", "assets/text/loginform2.html");
    this.load.image("splash", "assets/splash.png");
    this.load.image("button", "assets/buttons/1.png");
    this.load.image("button22", "assets/buttons/22.png");
  }

  async login(username, password) {
    try {
      const { data } = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("loggedInUser", data.username);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async signup(username, password) {
    try {
      const { data } = await axios.post("/api/users/signup", {
        username: username,
        password: password,
      });
      if (data.username) {
        this.login(username, password);
        localStorage.setItem("loggedInUser", data.username);
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await axios.post("/auth/logout");
      localStorage.loggedInUser = "";
    } catch (err) {
      console.error(err);
    }
  }

  handleLoggedInScreen(scene) {
    //  Populate the welcome text with their username
    scene.inText.setText("welcome " + localStorage.loggedInUser);
    scene.inText.setVisible(true);
    //  Add a message to highlight enter button
    scene.begintext = scene.add.text(410, 340, "Godspeed...", {
      color: "white",
      fontSize: "20px ",
    });
    scene.begintext.setInteractive();
    scene.begintext.on("pointerover", () =>
      scene.begintext.setStyle({ fill: "#ff69b4" })
    );
    scene.begintext.on("pointerout", () =>
      scene.begintext.setStyle({ fill: "#ffffff" })
    );
    //  Activate login button
    scene.helloButton.on("pointerdown", () => {
      scene.scene.start("FgScene");
      scene.scene.stop("MainScene");
    });
    //  Create logout button
    scene.logouttext = scene.add.text(400, 550, "logout", {
      color: "white",
      fontSize: "20px ",
    });
    scene.logouttext.setOrigin(0.5);
    scene.logouttext.setInteractive();
    scene.logouttext.on("pointerover", () =>
      scene.logouttext.setStyle({ fill: "#ff69b4" })
    );
    scene.logouttext.on("pointerout", () =>
      scene.logouttext.setStyle({ fill: "#ffffff" })
    );
    scene.logouttext.on("pointerdown", async () => {
      await scene.logout();
      game.config.login = false;
      scene.scene.restart();
    });
  }

  create() {
    // this.socket = io("http://localhost:8080");
    // this.socket.on("connect", function () {
    //   console.log("Connected!");
    // });

    // Initialize this
    const scene = this;

    //  Initialize config file for the game
    game.config.health = 10;
    game.config.points = 0;
    game.config.beginTime = new Date().getTime() / 1000;
    game.config.playerTime = 0;

    // Initialize enter button, stays inactive until login
    scene.add.image(400, 300, "splash").setScale(2.5);
    scene.helloButton = scene.add.image(400, 300, "button").setScale(0.25);
    scene.helloButton.setInteractive();
    scene.helloButtonTwo = scene.add.image(400, 300, "button22").setScale(0.25);
    scene.helloButtonTwo.visible = false;
    scene.helloButton.on(
      "pointerover",
      () => (scene.helloButtonTwo.visible = true)
    );
    scene.helloButton.on(
      "pointerout",
      () => (scene.helloButtonTwo.visible = false)
    );

    //  Initialize intro text
    scene.inText = scene.add.text(300, 10, "welcome", {
      color: "white",
      fontSize: "20px ",
    });
    scene.inText.setVisible(false);

    // If the user is not logged in, present login / signup
    if (!localStorage.loggedInUser || !localStorage.loggedInUser.length) {
      scene.inText.setVisible(true);
      scene.inText.setText("Please enter your name");

      // Create login / signup form
      scene.element = scene.add
        .dom(400, 115)
        .createFromCache("loginform2")
        .setScale(0.75);
      scene.element.addListener("click");

      // When user tries to login
      scene.element.on("click", async function (event) {
        if (event.target.name === "loginButton") {
          var username = scene.element.getChildByName("username");
          var password = scene.element.getChildByName("password");
          const user = await scene.login(username.value, password.value);
          console.log("USER ---->", user);
          //  Have they entered anything when they clicked submit? Did the login succeed?
          if (username.value !== "" && password.value !== "" && user.username) {
            console.log("INSIDE IF STATEMENT");
            //  Set config for the game
            game.config.usernameOne = username.value;
            game.config.login = true;
            //  Turn off the click events
            scene.element.removeListener("click");
            //  Hide the login element
            scene.element.setVisible(false);
            //  Switch to login screen
            scene.handleLoggedInScreen(scene);
          }
          // When user tries to sign up
        } else if (event.target.name === "signupButton") {
          var username = scene.element.getChildByName("username2");
          var password = scene.element.getChildByName("password2");
          const user = await scene.signup(username.value, password.value);
          console.log("USER ---->", user);
          //  Have they entered anything? Was signup and auto login successful?
          if (username.value !== "" && password.value !== "" && user.username) {
            console.log("INSIDE IF STATEMENT");
            //  Set config for the game
            game.config.usernameOne = username.value;
            game.config.login = true;
            //  Turn off the click events
            scene.element.removeListener("click");
            //  Hide the login element
            scene.element.setVisible(false);
            //  Switch to login screen
            scene.handleLoggedInScreen(scene);
          }
        }
      });
      // User is already persistantly logged in
    } else {
      scene.handleLoggedInScreen(scene);
    }
  }
}
