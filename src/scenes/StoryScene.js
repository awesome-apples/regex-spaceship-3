import Phaser, { ScaleModes } from "phaser";
import { io } from "socket.io-client";

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
    this.paragraph = 0;
    this.typeSpeed = 10;
    this.story = [
      `A kind of long time ago in a galaxy 20 minutes away...you set off with a loyal crew aboard the SS Regular Expressioner (hey, you didn’t name it). Things were going great. You were enjoying the perks like annual company outings to the sun and dehydrated taco Tuesday.`,
      `But one day... disaster struck! An alien snuck aboard the ship. It began messing with all of the systems in am attempt to sabotage you. Those pesky little stardwellers!`,
      `Now, there’s only one way to repair the SS Regular Expressioner... through the use of regular expressions. Who would’ve thought?!`,
      `Travel around the spaceship and solve the regular expression riddles in order to fix the damage and not, you know, like get exploded into space or something. Your boss probably wouldn’t be too happy about that.`,
    ];
  }

  preload() {
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("stars", "assets/backgrounds/stars.png");
  }

  create() {
    const scene = this;

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
    scene.skipContainer = scene.add.graphics();
    scene.skipContainer.fillRoundedRect(225, 450, 70, 25, 5);
    scene.skipContainer.fillStyle(0x616161);
    scene.skipText = scene.add.text(241, 455, "Skip", {
      fill: "#000000",
      fontSize: "15px",
    });

    scene.nextContainer = scene.add.graphics();
    scene.nextContainer.fillRoundedRect(540, 450, 70, 25, 5);
    scene.nextContainer.fillStyle(0x2045fa);
    scene.nextText = scene.add.text(558, 455, "Next", {
      fill: "#000000",
      fontSize: "15px",
    });

    //make buttons interactive
    //skip button
    scene.skipText.setInteractive();
    scene.skipText.on("pointerover", () => {
      scene.nextContainer.fillStyle(0x2075fa);
    });
    scene.skipText.on("pointerout", () => {
      scene.nextContainer.fillStyle(0x2045fa);
    });
    scene.skipText.on("pointerdown", () => {
      scene.scene.start("MainScene");
    });

    //next button
    scene.nextText.on("pointerdown", () => {
      if (this.paragraph + 1 === this.story.length - 1) {
        this.nextText.text = "Play";
      }
      scene.storyLabel.text = "";
      scene.nextText.removeInteractive();
      scene.skipContainer.fillStyle(0x616161);
      scene.wrapText(this.story[++this.paragraph]);
    });

    //CALL WRAP TEXT
    scene.wrapText(scene.story[this.paragraph]);
  }

  wrapText(text) {
    const lines = this.storyLabel.getWrappedText(text);
    console.log("lines", lines);
    const wrappedText = lines.join("\n");
    console.log("wrapped text", wrappedText);
    this.typeText(wrappedText);
  }

  typeText(text) {
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
    this.nextText.setInteractive();
    if (this.paragraph === this.story.length - 1) {
      this.skipContainer.fillStyle(0x03c04a);
      this.nextText.on("pointerover", () => {
        this.skipContainer.fillStyle(0x04d153);
      });
      this.nextText.on("pointerout", () => {
        this.skipContainer.fillStyle(0x03c04a);
      });
      this.nextText.on("pointerdown", () => {
        this.scene.start("MainScene");
      });
    } else {
      this.skipContainer.fillStyle(0xebd405);
      this.nextText.on("pointerover", () => {
        this.skipContainer.fillStyle(0xffe605);
      });
      this.nextText.on("pointerout", () => {
        this.skipContainer.fillStyle(0xebd405);
      });
    }
  }
}
