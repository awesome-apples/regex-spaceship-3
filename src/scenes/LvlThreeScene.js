import Ground from "../entity/Ground";
import PlatformOne from "../entity/PlatformOne";
import PlatformTwo from "../entity/PlatformTwo";
import PlatformThree from "../entity/PlatformThree";
import PlatformFour from "../entity/PlatformFour";
import PlatformFive from "../entity/PlatformFive";
import PlatformSix from "../entity/PlatformSix";
import PlatformSeven from "../entity/PlatformSeven";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";
import Baby from "../entity/Baby";
import Mushroom from "../entity/Mushroom";
import Floateye from "../entity/Floateye";
import End from "../entity/End";
import Fireball from "../entity/Fireball";

/**
 *
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */
let mushX;
let mushY;
let floatX;
let floatY;

export default class LvlThreeScene extends Phaser.Scene {
  constructor() {
    super("LvlThreeScene");
    this.collectGun = this.collectGun.bind(this);
    this.fireLaser = this.fireLaser.bind(this);
    this.hit = this.hit.bind(this);
  }

  preload() {
    //SPRITES
    this.load.spritesheet("bubble", "assets/spriteSheets/bubble_run.png", {
      frameWidth: 35,
      frameHeight: 45,
    });
    this.load.spritesheet("baby", "assets/spriteSheets/baby_run.png", {
      frameWidth: 18,
      frameHeight: 32,
    });
    this.load.spritesheet("mushroom", "assets/spriteSheets/mushroom.png", {
      frameWidth: 35,
      frameHeight: 45,
    });

    this.load.spritesheet("floateye", "assets/spriteSheets/floateye.png", {
      frameWidth: 38,
      frameHeight: 35,
    });

    this.load.spritesheet(
      "coke",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-coke/banner-coke-sheet.png",
      {
        frameWidth: 27,
        frameHeight: 78,
      }
    );

    this.load.spritesheet(
      "fireballspritesheet",
      "assets/spriteSheets/fireball/fireball.png",
      {
        frameWidth: 64,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      "sushispritesheet",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-sushi/sushianime.png",
      {
        frameWidth: 36,
        frameHeight: 13,
      }
    );

    this.load.spritesheet(
      "bannersidespritesheet",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-side/banner-side-spritesheet.png",
      {
        frameWidth: 19,
        frameHeight: 76,
      }
    );

    this.load.spritesheet(
      "bannerneonspritesheet",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-big/banner-big-spritesheet.png",
      {
        frameWidth: 35,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "bannercharspritesheet",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-neon/banner-neon-spritesheet.png",
      {
        frameWidth: 19,
        frameHeight: 48,
      }
    );

    this.load.spritesheet(
      "bannerbluespritesheet",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-scroll/banner-scroll-sheet.png",
      {
        frameWidth: 13,
        frameHeight: 47,
      }
    );

    this.load.image("gun", "assets/sprites/gun.png");
    this.load.image("laser", "assets/sprites/laserBolt.png");
    this.load.image("heart", "assets/sprites/heart.png");

    this.load.image("sky", "assets/backgrounds/aurora/Sky.png");
    this.load.image("mountains", "assets/backgrounds/aurora/Mountains.png");
    this.load.image("forest", "assets/backgrounds/aurora/Forest.png");

    this.load.image("ground", "assets/backgrounds/cyberpunk/long/ground.png");

    this.load.image(
      "sushi",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-sushi/banner-sushi-1.png"
    );

    this.load.image(
      "coke1",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-coke/banner-coke-1.png"
    );
    this.load.image(
      "bannerside",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-side/banner-side-2.png"
    );
    this.load.image(
      "bannerneon",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-big/banner-big-3.png"
    );
    this.load.image(
      "bannerchar",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-neon/banner-neon-3.png"
    );
    this.load.image(
      "bannerblue",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-scroll/banner-scroll-1.png"
    );
    this.load.image("fireball", "assets/spriteSheets/fireball/FB002.png");

    this.load.image("earth", "assets/Planets/Terran.png");

    this.load.image(
      "end",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-arrow.png"
    );

    this.load.image("police", "assets/backgrounds/warpedcity/police.png");

    //SOUNDS
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("achieve", "assets/audio/SOPHIE_snap_02.wav");
    this.load.audio("laser", "assets/audio/laser.wav");
    this.load.audio("kill", "assets/audio/scream.wav");
    this.load.audio("hurt", "assets/audio/hurt.wav");
  }

  createGround(x, y, count, texture) {
    const w = this.textures.get(texture).getSourceImage().width;
    let wid = x;
    for (let i = 0; i < count; i++) {
      this.groundGroup.create(wid, y, texture).setScale(3.1).alpha = 0;
      wid += w;
    }
  }

  createFireballs(x, y, count, texture) {
    const w = this.textures.get(texture).getSourceImage().width;
    let wid = x;
    for (let i = 0; i < count; i++) {
      this.fireballGroup.create(wid, y, texture).setScale(2.8);
      wid += w * Math.random() * 20;
    }
  }

  createLooped(totalWidth, texture, scrollFactor) {
    const w = this.textures.get(texture).getSourceImage().width;
    const count = Math.ceil(totalWidth / w) * scrollFactor;

    let x = 530;
    for (let i = 0; i < count; ++i) {
      const m = this.add
        .image(x, game.config.height * 0.515, texture)
        .setScale(3.9)
        .setScrollFactor(scrollFactor);
      x += m.width * 3.9;
    }
  }

  advanceLevel() {
    this.scene.start("InterludeThree");
    this.scene.stop("LvlThreeScene");
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    const width = game.config.width;
    const height = game.config.height;
    const totalWidth = width * 20;

    //BACKROUND
    this.createLooped(totalWidth, "sky", 0.08);
    this.createLooped(totalWidth, "mountains", 0.18);
    this.createLooped(totalWidth, "forest", 0.22);

    //GROUND
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(0, 570, 40, "ground");

    //TEXT
    this.pointText = this.add.text(20, 20, `points: ${game.config.points}`, {
      fontSize: 32,
      fontFamily: "Orbitron, sans-serif",
      fill: "#39ff14",
    });
    this.pointText.setScrollFactor(0);

    this.healthText = this.add.text(
      20,
      60,
      `health: ${Math.round(game.config.health)}`,
      {
        fontSize: 32,
        fontFamily: "Audiowide, cursive",
        fill: "#39ff14",
      }
    );
    this.healthText.setScrollFactor(0);

    this.timeText = this.add.text(20, 90, `time: ${game.config.playerTime}`, {
      fontSize: 32,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.timeText.setScrollFactor(0);

    this.gameOverText = this.add.text(400, 300, `Game Over`, {
      fontSize: 48,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setScrollFactor(0);
    this.gameOverText.visible = false;

    this.startOverButton = this.add.text(400, 400, "Retry", {
      fontSize: 36,
      fontFamily: "Audiowide, cursive",
      fill: "#39ff14",
    });
    this.startOverButton.setOrigin(0.5);
    this.startOverButton.setScrollFactor(0);
    this.startOverButton.setInteractive();
    this.startOverButton.on("pointerover", () =>
      this.startOverButton.setStyle({ fill: "#ff69b4" })
    );
    this.startOverButton.on("pointerout", () =>
      this.startOverButton.setStyle({ fill: "#39ff14" })
    );
    this.startOverButton.on("pointerdown", () => this.scene.start("MainScene"));
    this.startOverButton.visible = false;

    //HEARTS
    this.hearts = this.physics.add.group({
      key: "heart",
      repeat: 100,
      setXY: { x: 900, y: 0, stepX: 250 },
    });

    //EARTH
    this.earth = this.physics.add.group({
      key: "earth",
      repeat: 1,
      setXY: { x: 400, y: 250 },
    });

    this.earth.children.iterate((child) => {
      child.setScale(3.1);
      child.body.allowGravity = false;
      child.setScrollFactor(0);
      child.update = function () {};
    });

    this.hearts.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setScale(0.06);
    });
    // SPRITES
    this.gun = new Gun(this, 300, 400, "gun").setScale(0.25);
    this.baby = new Baby(this, 30, 200, "baby").setScale(2);
    this.end = new End(this, width * 19.75, 400, "end").setScale(5.0);

    //PLATFORMS

    this.platformGroupOne = this.physics.add.staticGroup({
      classType: PlatformOne,
      runChildUpdate: true,
    });
    this.platformGroupOne.createMultiple({
      key: "sushi",
      repeat: 25,
    });
    this.platformGroupOne.children.iterate((child) => {
      let y = 370;
      let x = Phaser.Math.Between(320, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(3.1);
      child.refreshBody();

      child.update = function () {
        child.play("sushianime", true);
      };
    });

    this.platformGroupTwo = this.physics.add.staticGroup({
      classType: PlatformTwo,
      runChildUpdate: true,
    });
    this.platformGroupTwo.createMultiple({
      key: "coke1",
      repeat: 10,
    });
    this.platformGroupTwo.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(300, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(3.1);
      child.refreshBody();

      child.update = function () {
        child.play("cokeanime", true);
      };
    });

    this.platformGroupThree = this.physics.add.staticGroup({
      classType: PlatformThree,
      runChildUpdate: true,
    });
    this.platformGroupThree.createMultiple({
      key: "bannerside",
      repeat: 10,
    });
    this.platformGroupThree.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(740, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(2.1);
      child.refreshBody();

      child.update = function () {
        child.play("bannersideanime", true);
      };
    });

    this.platformGroupFour = this.physics.add.staticGroup({
      classType: PlatformFour,
      runChildUpdate: true,
    });
    this.platformGroupFour.createMultiple({
      key: "police",
      repeat: 10,
    });
    this.platformGroupFour.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(2500, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(2.1);
      child.refreshBody();

      child.update = function () {};
    });

    this.platformGroupFive = this.physics.add.staticGroup({
      classType: PlatformFive,
      runChildUpdate: true,
    });
    this.platformGroupFive.createMultiple({
      key: "bannerneon",
      repeat: 10,
    });
    this.platformGroupFive.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(3000, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(1.8);
      child.refreshBody();

      child.update = function () {
        child.play("bannerneonanime", true);
      };
    });

    this.platformGroupSix = this.physics.add.staticGroup({
      classType: PlatformSix,
      runChildUpdate: true,
    });
    this.platformGroupSix.createMultiple({
      key: "bannerchar",
      repeat: 10,
    });
    this.platformGroupSix.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(4000, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(2.3);
      child.refreshBody();

      child.update = function () {
        child.play("bannercharanime", true);
      };
    });

    this.platformGroupSeven = this.physics.add.staticGroup({
      classType: PlatformSeven,
      runChildUpdate: true,
    });
    this.platformGroupSeven.createMultiple({
      key: "bannerblue",
      repeat: 10,
    });
    this.platformGroupSeven.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(4000, width * 20);

      child.setY(y);
      child.setX(x);
      child.setScale(2.8);
      child.refreshBody();

      child.update = function () {
        child.play("bannerblueanime", true);
      };
    });

    //MUSHROOMS
    // this.mushroomGroup = this.physics.add.group({ classType: Mushroom });
    this.mushroomGroup = this.physics.add.group({
      classType: Mushroom,
      runChildUpdate: true,
    });
    this.mushroomGroup.createMultiple({
      key: "mushroom",
      repeat: 12,
    });
    this.mushroomGroup.children.iterate((child) => {
      let y = 200;
      let x = Phaser.Math.Between(0, width * 20);
      child.flipX = !child.flipX;
      child.setY(y);
      child.setX(x);
      child.setScale(2.3);

      child.update = function () {
        child.play("mushroomrun", true);
        child.setVelocityX(-100);
      };
    });

    //FLOATEYE
    this.floateyeGroup = this.physics.add.group({ classType: Floateye });

    this.floateye = this.floateyeGroup
      .create(900, 50, "floateye")
      .setScale(2.3);
    this.floateye2 = this.floateyeGroup
      .create(1230, 50, "floateye")
      .setScale(2.3);
    this.floateye3 = this.floateyeGroup
      .create(3950, 50, "floateye")
      .setScale(2.3);
    this.floateye4 = this.floateyeGroup
      .create(4800, 50, "floateye")
      .setScale(2.3);
    this.floateye5 = this.floateyeGroup
      .create(6700, 50, "floateye")
      .setScale(2.3);
    this.floateye6 = this.floateyeGroup
      .create(9300, 50, "floateye")
      .setScale(2.3);
    this.floateye7 = this.floateyeGroup
      .create(11111, 50, "floateye")
      .setScale(2.3);
    this.floateye8 = this.floateyeGroup
      .create(12363, 50, "floateye")
      .setScale(2.3);
    this.floateye9 = this.floateyeGroup
      .create(14083, 50, "floateye")
      .setScale(2.3);
    this.floateye10 = this.floateyeGroup
      .create(17402, 50, "floateye")
      .setScale(2.3);
    this.floateye11 = this.floateyeGroup
      .create(19404, 50, "floateye")
      .setScale(2.3);
    this.floateye12 = this.floateyeGroup
      .create(20392, 50, "floateye")
      .setScale(2.3);

    //FIREBALLS
    this.fireballGroup = this.physics.add.group({
      classType: Fireball,
      runChildUpdate: true,
    });
    this.fireballGroup.createMultiple({
      key: "fireball",
      repeat: 40,
    });
    this.fireballGroup.children.iterate((child) => {
      let y = Phaser.Math.Between(-200, -2000);
      let x = Phaser.Math.Between(0, width * 20);

      child.setY(y);
      child.setX(x);
      child.setMaxVelocity(200);
      child.setScale(2);

      child.update = function () {
        child.play("fireballanime", true);
        child.setVelocityX(100);
        if (this.y > 600) {
          this.y = 0;
        }
      };
    });

    //PHYSICS
    this.physics.add.collider(this.baby, this.groundGroup);
    this.physics.add.collider(this.gun, this.groundGroup);
    this.physics.add.collider(this.mushroomGroup, this.groundGroup);
    this.physics.add.collider(this.floateyeGroup, this.groundGroup);
    this.physics.add.collider(this.end, this.groundGroup);

    this.physics.add.collider(this.hearts, this.platformGroupOne);
    this.physics.add.collider(this.baby, this.platformGroupOne);

    this.physics.add.collider(this.hearts, this.platformGroupTwo);
    this.physics.add.collider(this.baby, this.platformGroupTwo);

    this.physics.add.collider(this.hearts, this.platformGroupThree);
    this.physics.add.collider(this.baby, this.platformGroupThree);

    this.physics.add.collider(this.hearts, this.platformGroupFour);
    this.physics.add.collider(this.baby, this.platformGroupFour);

    this.physics.add.collider(this.hearts, this.platformGroupFive);
    this.physics.add.collider(this.baby, this.platformGroupFive);

    this.physics.add.collider(this.hearts, this.platformGroupSix);
    this.physics.add.collider(this.baby, this.platformGroupSix);

    this.physics.add.collider(this.hearts, this.platformGroupSeven);
    this.physics.add.collider(this.baby, this.platformGroupSeven);

    this.physics.add.overlap(
      this.floateyeGroup,
      this.baby,
      this.monsterHit,
      null,
      this
    );

    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false,
      maxSize: 40,
    });

    //COLLISIONS
    this.physics.add.overlap(this.baby, this.gun, this.collectGun, null, this);

    this.physics.add.overlap(
      this.lasers,
      this.mushroomGroup,
      this.hit,
      null,
      this
    );
    this.physics.add.overlap(
      this.lasers,
      this.floateyeGroup,
      this.hit,
      null,
      this
    );

    this.physics.add.overlap(
      this.baby,
      this.mushroomGroup,
      this.monsterHit,
      null,
      this
    );

    this.physics.add.overlap(
      this.baby,
      this.fireballGroup,
      this.monsterHit,
      null,
      this
    );

    this.physics.add.overlap(
      this.baby,
      this.hearts,
      this.collectHeart,
      null,
      this
    );
    this.physics.add.overlap(
      this.baby,
      this.end,
      this.advanceLevel,
      null,
      this
    );

    //MOVEMENT
    this.cursors = this.input.keyboard.createCursorKeys();

    //CAMERA
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, width * 20, height);
    this.cameras.main.startFollow(this.baby);

    //ANIMATIONS
    this.createAnimations();

    //SOUNDS
    this.jumpSound = this.sound.add("jump");
    this.heartSound = this.sound.add("achieve");
    this.laserSound = this.sound.add("laser");
    this.killSound = this.sound.add("kill");
    this.hurtSound = this.sound.add("hurt");
  }

  monsterHit(baby, monster) {
    baby.anims.play("babyjump");
    this.hurtSound.play();
    game.config.health -= 0.07;
    this.healthText.setText(`health: ${Math.floor(game.config.health)}`);

    if (game.config.health < 1) {
      this.physics.pause();
      this.baby.setTint(0xff0000);
      this.gameOver = true;
      this.gameOverText.visible = true;
      this.startOverButton.visible = true;
    }
  }

  collectHeart(baby, heart) {
    heart.disableBody(true, true);
    game.config.health = game.config.health + 1;
    this.healthText.setText(`health: ${Math.round(game.config.health)}`);
    this.heartSound.play();
  }

  fireLaser(x, y, left) {
    // These are the offsets from the player's position that make it look like
    // the laser starts from the gun in the player's hand
    const offsetX = 56;
    const offsetY = 14;
    const laserX = this.baby.x + (this.baby.facingLeft ? -offsetX : offsetX);
    const laserY = this.baby.y + offsetY;
    this.laserSound.play();

    let laser = this.lasers.getFirstDead();

    if (!laser) {
      laser = new Laser(
        this,
        laserX,
        laserY,
        "laser",
        this.baby.facingLeft
      ).setScale(0.25);
      // Add our newly created to the group
      this.lasers.add(laser);
    }
    laser.reset(laserX, laserY, this.baby.facingLeft);
  }

  // make the laser inactive and insivible when it hits the enemy
  // ENEMY LASER INTERACTIONS
  hit(laser, monster) {
    laser.setActive(false);
    laser.setVisible(false);
    monster.disableBody(true, true);
    this.killSound.play();
    game.config.points++;
    this.pointText.setText(`points: ${game.config.points}`);
  }
  //animations for player and baby sprites

  collectGun(baby, gun) {
    gun.disableBody(true, true);
    this.baby.armed = true;
  }

  updateTime() {
    const time = new Date().getTime() / 1000;
    game.config.playerTime = time - game.config.beginTime;
    this.timeText.text = `time: ${game.config.playerTime.toFixed(2)}`;
  }

  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("bubble", { start: 1, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "bubble", frame: 6 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleUnarmed",
      frames: [{ key: "bubble", frame: 1 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "bubble", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "babyrun",
      frames: this.anims.generateFrameNumbers("baby", { start: 1, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "babyjump",
      frames: [{ key: "baby", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "babyidleUnarmed",
      frames: [{ key: "baby", frame: 1 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "babyidleArmed",
      frames: [{ key: "baby", frame: 6 }],
      frameRate: 20,
    });
    //animations for mushroom
    this.anims.create({
      key: "mushroomrun",
      frames: this.anims.generateFrameNumbers("mushroom", {
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "mushroomidle",
      frames: [{ key: "mushroom", frame: 1 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "mushroomjump",
      frames: [{ key: "mushroom", frame: 6 }],
      frameRate: 20,
    });

    //animations for floateye
    this.anims.create({
      key: "floatfly",
      frames: this.anims.generateFrameNumbers("floateye", {
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "floatidle",
      frames: [{ key: "floateye", frame: 1 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "fireballanime",
      frames: this.anims.generateFrameNumbers("fireballspritesheet", {
        start: 1,
        end: 5,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "sushianime",
      frames: this.anims.generateFrameNumbers("sushispritesheet", {
        start: 1,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "cokeanime",
      frames: this.anims.generateFrameNumbers("coke", {
        start: 1,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bannersideanime",
      frames: this.anims.generateFrameNumbers("bannersidespritesheet", {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bannerneonanime",
      frames: this.anims.generateFrameNumbers("bannerneonspritesheet", {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bannercharanime",
      frames: this.anims.generateFrameNumbers("bannercharspritesheet", {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bannerblueanime",
      frames: this.anims.generateFrameNumbers("bannerbluespritesheet", {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });
  }
  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>

    this.updateTime();
    this.baby.update(this.cursors, this.jumpSound);

    this.floateye.update();
    this.floateye2.update();
    this.floateye3.update();
    this.floateye4.update();
    this.floateye5.update();
    this.floateye6.update();
    this.floateye7.update();
    this.floateye8.update();
    this.floateye9.update();
    this.floateye10.update();
    this.floateye11.update();
    this.floateye12.update();
    this.gun.update(
      time,
      this.baby,
      this.cursors,
      this.fireLaser // Callback fn for creating lasers
    );
  }
}
