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
    this.load.image("computer", "assets/backgrounds/computer.png");
    this.load.image("stars", "assets/backgrounds/stars.png");
    this.load.audio("startMusic", "audio/Start_Screen.mp3");
    this.load.audio("typing", "audio/Typing_Text.wav");
    this.load.audio("click", "audio/Button_Click.wav");
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
      scene.click.play();
      this.sound.removeAll();
      scene.scene.start("MainScene");
    });

    //next button
    scene.nextText.on("pointerdown", () => {
      scene.click.play();
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
        this.click.play();
        this.sound.removeAll();
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
