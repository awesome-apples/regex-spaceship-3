import Phaser, { ScaleModes } from "phaser";
import { io } from "socket.io-client";

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
    this.paragraph = 0;
    this.typeSpeed = 30;
    this.story = [
      `A kind of long time ago in a galaxy 20 minutes away...you set off with a loyal crew aboard the SS Regular Expressioner (hey, you didn’t name it). Things were going great. You were enjoying the perks like annual company outings to the sun and dehydrated taco Tuesday.`,
      `But one day... disaster struck! An alien snuck aboard the ship. It began messing with all of the systems in an attempt to sabotage you. Those pesky little stardwellers!`,
      `Now, there’s only one way to repair the SS Regular Expressioner... through the use of regular expressions. Who would’ve thought?!`,
      `Travel around the spaceship and solve the regular expression riddles in order to fix the damage and not, you know, get exploded into space or something. Your boss probably wouldn’t be too happy about that.`,
    ];
  }

  preload() {
    //LOADING SCREEN
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
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("stars", "assets/backgrounds/stars.png");
    this.load.audio("startMusic", "audio/Start_Screen.mp3");
    this.load.audio("typing", "audio/Typing_Text.wav");
    this.load.audio("click", "audio/Button_Click.wav");

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
  }

  create() {
    const scene = this;

    //add sfx
    scene.startMusic = scene.sound.add("startMusic", {
      volume: 1,
      loop: true,
    });
    scene.typing = scene.sound.add("typing", {
      volume: 0.5,
      loop: true,
    });
    scene.click = scene.sound.add("click");

    //play music
    scene.startMusic.play();

    //add images
    scene.add.image(-200, 0, "stars").setOrigin(0).setScale(1.6);
    scene.add.image(150, 100, "computer").setOrigin(0).setScale(0.75);

    scene.add.text(210, 168, "Tragic_Backstory.txt", {
      fill: "#00ff00",
      fontSize: "12px",
      fontStyle: "bold",
    });
    scene.storyLabel = scene.add.text(220, 200, "", {
      fill: "#00ff00",
      fontSize: "20px",
      wordWrap: { width: 350, useAdvancedWrap: true },
    });

    //BUTTONS
    //create buttons
    scene.skipContainer = scene.add.rexRoundRectangle(
      260,
      463,
      70,
      25,
      5,
      0x2045fa
    );
    // scene.skipContainer.fillStyle(0x2045fa);
    // scene.skipContainer.fillRoundedRect(225, 450, 70, 25, 5);
    scene.skipText = scene.add.text(241, 455, "Skip", {
      fill: "#000000",
      fontSize: "15px",
    });

    scene.nextContainer = scene.add.rexRoundRectangle(
      575,
      463,
      70,
      25,
      5,
      0x616161
    );
    // scene.nextContainer.fillStyle(0x616161);
    // scene.nextContainer.fillRoundedRect(540, 450, 70, 25, 5);
    scene.nextText = scene.add.text(558, 455, "Next", {
      fill: "#000000",
      fontSize: "15px",
    });

    //make buttons interactive
    //skip button
    scene.skipContainer.setInteractive();
    scene.skipContainer.on("pointerover", () => {
      console.log("over");
      scene.skipContainer.setFillStyle(0x2075fa);
    });
    scene.skipContainer.on("pointerout", () => {
      scene.skipContainer.setFillStyle(0x2045fa);
    });
    scene.skipContainer.on("pointerdown", () => {
      scene.click.play();
      scene.sound.removeByKey("typing");
      scene.sound.removeByKey("startMusic");
      scene.scene.start("MainScene");
    });

    //next button
    scene.nextContainer.on("pointerdown", () => {
      scene.click.play();
      if (this.paragraph + 1 === this.story.length - 1) {
        this.nextText.text = "Play";
      }
      scene.storyLabel.text = "";
      scene.nextContainer.removeInteractive();
      scene.nextContainer.setFillStyle(0x616161);
      scene.wrapText(this.story[++this.paragraph]);
    });

    //CALL WRAP TEXT
    scene.wrapText(scene.story[this.paragraph]);
  }

  wrapText(text) {
    const lines = this.storyLabel.getWrappedText(text);
    const wrappedText = lines.join("\n");
    this.typeText(wrappedText);
  }

  typeText(text) {
    this.typing.play();
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.storyLabel.text += text[i];
        i++;
      },
      repeat: length - 1,
      delay: this.typeSpeed,
    });
    this.time.delayedCall(this.typeSpeed * length, this.enableNext, null, this);
  }

  enableNext() {
    this.typing.stop();
    this.nextContainer.setInteractive();
    if (this.paragraph === this.story.length - 1) {
      this.nextContainer.setFillStyle(0x03c04a);
      this.nextContainer.on("pointerover", () => {
        this.nextContainer.setFillStyle(0x04d153);
      });
      this.nextContainer.on("pointerout", () => {
        this.nextContainer.fillStyle(0x03c04a);
      });
      this.nextContainer.on("pointerdown", () => {
        this.click.play();
        this.sound.removeAll();
        this.scene.start("MainScene");
      });
    } else {
      this.nextContainer.setFillStyle(0xebd405);
      this.nextContainer.on("pointerover", () => {
        this.nextContainer.setFillStyle(0xffe605);
      });
      this.nextContainer.on("pointerout", () => {
        this.nextContainer.setFillStyle(0xebd405);
      });
    }
  }
}
