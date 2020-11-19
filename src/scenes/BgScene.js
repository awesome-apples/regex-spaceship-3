import "phaser";

export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    // this.load.image("sky", "assets/backgrounds/cyberpunk/far-buildings.png");
    // this.load.image("mid", "assets/backgrounds/cyberpunk/back-buildings.png");
    // this.load.image("close", "assets/backgrounds/cyberpunk/foreground.png");
    // this.load.image("sky", "assets/backgrounds/cyberpunk/cyberpunk-street.png");
    ///////////old
    // this.load.image("sky", "assets/backgrounds/sky.png");
    // this.load.image("logo", "assets/backgrounds/fullBlastLogo.png");
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    // let bg = this.addimage(0, 0, "sky");
    // align.scaleToGameW(bg, 2);
    //old
    // this.bg = this.add.tileSprite(0, 0, 0, 0, "sky");
    // this.bg.setOrigin(0, 0);
    // this.bg.setScrollFactor(0);
    // this.add.image(-160, 0, "sky").setOrigin(0).setScale(3.12);
    // this.add.image(380, 80, "logo").setScale(5);
  }

  // update() {
  //   this.bg.tilePositionX = this.myCam.scrollX * 0.3;
  // }
}
