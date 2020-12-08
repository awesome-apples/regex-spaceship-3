import Phaser from "phaser";

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
    this.load.html("codeform", "assets/text/codeform.html");
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("popup", "assets/backgrounds/singlepopup.png");
  }

  create() {
    const scene = this;

    scene.popUp = scene.add.image(400, 300, "computer");
    scene.requestBox = scene.add.image(300, 280, "popup");
    scene.enterBox = scene.add.image(500, 350, "popup");

    //title
    scene.title = scene.add.text(125, 83, "RegEx Spaceship", {
      fill: "#00ff00",
      fontSize: "32px",
      fontStyle: "bold",
    });

    scene.requestButton = scene.add
      .dom(280, 320, "button", "width: 150px; height: 25px", "Request Room Key")
      .setOrigin(0.5);

    //right popup
    scene.inputElement = scene.add.dom(500, 400).createFromCache("codeform");
    scene.inputElement.addListener("click");
    scene.inputElement.on("click", function (event) {
      if (event.target.name === "enterRoom") {
        const input = scene.inputElement.getChildByName("code-form");
        let uppercase = input.value.replace(/[a-z]/g, (L) => L.toUpperCase());
        scene.socket.emit("isKeyValid", uppercase);
      }
    });

    scene.requestButton.setInteractive();
    scene.requestButton.on("pointerdown", () => {
      scene.socket.emit("getRoomCode");
      scene.requestButton.disableInteractive();
    });

    scene.notValidText = scene.add.text(400, 350, "", {
      fill: "#ff0000",
      fontSize: "15px",
    });
    scene.roomKeyText = scene.add.text(210, 250, "", {
      fill: "#00ff00",
      fontSize: "30px",
      fontStyle: "bold",
    });

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
      console.log("inside already started listener");
      scene.notValidText.setText("Game has already begun");
    });
  }
  update() {}
}
