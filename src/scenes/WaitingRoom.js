import Phaser from "phaser";
import { func } from "prop-types";

export default class WaitingRoom extends Phaser.Scene {
  constructor() {
    super("WaitingRoom");
    this.state = {};
    this.hasBeenSet = false;
  }

  init(data) {
    this.socket = data.socket;
  }

  preload() {
    //LOADING SCREEN BAR
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    //TEXTURES
    this.load.html("codeform", "assets/text/codeform.html");
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("popup", "assets/backgrounds/singlepopup.png");

    //LOADING SCREEN LISTENERS
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on("fileprogress", function (file) {});
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    //AUDIO
    this.load.audio("click", "audio/Button_Click.wav");
  }

  create() {
    const scene = this;

    //MUSIC
    scene.click = scene.sound.add("click");
    const keyObj = scene.input.keyboard.addKey("enter");
    keyObj.enabled = false;
    scene.popUp = scene.add.image(400, 300, "computer");
    scene.requestBox = scene.add.image(300, 280, "popup");
    scene.enterBox = scene.add.image(500, 350, "popup");

    //TITLE
    scene.title = scene.add.text(125, 83, "RegEx Spaceship", {
      fill: "#00ff00",
      fontSize: "32px",
      fontStyle: "bold",
    });

    scene.requestButton = scene.add
      .dom(280, 320, "button", "width: 150px; height: 25px", "Request Room Key")
      .setOrigin(0.5);

    //RIGHT POPUP
    scene.inputElement = scene.add.dom(500, 400).createFromCache("codeform");
    scene.inputElement.addListener("click");
    scene.inputElement.on("click", function (event) {
      scene.click.play();
      if (event.target.name === "enterRoom") {
        const input = scene.inputElement.getChildByName("code-form");
        let uppercase = input.value.replace(/[a-z]/g, (L) => L.toUpperCase());
        scene.socket.emit("isKeyValid", uppercase);
      }
    });

    //REQUEST ROOMKEY BUTTON
    scene.requestButton.setInteractive();
    scene.requestButton.on("pointerdown", () => {
      scene.click.play();
      scene.socket.emit("getRoomCode");
      scene.requestButton.disableInteractive();
    });

    //INVALID ROOMKEY TEXT
    scene.notValidText = scene.add.text(400, 350, "", {
      fill: "#ff0000",
      fontSize: "15px",
    });
    //ROOMKEY TEXT
    scene.roomKeyText = scene.add.text(210, 250, "", {
      fill: "#00ff00",
      fontSize: "30px",
      fontStyle: "bold",
    });
    //SOCKETS
    scene.socket.on("roomCreated", function (roomKey) {
      scene.roomKey = roomKey;
      scene.roomKeyText.setText(scene.roomKey);
    });
    scene.socket.on("keyNotValid", function () {
      scene.notValidText.setText("Invalid Room Key");
    });
    scene.socket.on("keyIsValid", function (input) {
      scene.socket.emit("joinRoom", input);
      scene.scene.stop("WaitingRoom");
    });
    scene.socket.on("gameAlreadyStarted", function () {
      scene.notValidText.setText("Game has already begun");
    });
    scene.socket.on("gameAlreadyFull", function () {
      scene.notValidText.setText("Game is already full");
    });
  }
}
