import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Enemy from "../entity/Enemy";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";
import Baby from "../entity/Baby";
import Mushroom from "../entity/Mushroom";
import Floateye from "../entity/Floateye";
import End from "../entity/End";
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
let gameOver = false;
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
      "end",
      "assets/backgrounds/warpedcity/ENVIRONMENT/props/banner-arrow.png"
    );

    //SOUNDS
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("achieve", "assets/audio/achieve.wav");
    this.load.audio("laser", "assets/audio/laser.wav");
    this.load.audio("kill", "assets/audio/scream.wav");
  }

  createGround(x, y, count, texture) {
    const w = this.textures.get(texture).getSourceImage().width;
    let wid = x;
    for (let i = 0; i < count; i++) {
      this.groundGroup.create(wid, y, texture).setScale(3.1).alpha = 0;
      wid += w;
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

    ///// SPRITES

    // this.player = new Player(this, 100, 200, "bubble").setScale(2);
    // this.enemy = new Enemy(this, 600, 400, "brandon").setScale(0.25);
    this.mushroom = new Mushroom(this, 650, 200, "mushroom").setScale(2.3);
    this.floateye = new Floateye(this, 650, 50, "floateye").setScale(2.3);
    this.end = new End(this, 700, 200, "end");
    this.gun = new Gun(this, 300, 400, "gun").setScale(0.25);
    this.baby = new Baby(this, 30, 200, "baby").setScale(2);
    this.end = new End(this, 700, 200, "end");

    //HEARTS
    this.hearts = this.physics.add.group({
      key: "heart",
      repeat: 11,
      setXY: { x: 2000, y: 0, stepX: 1500 },
    });

    this.hearts.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setScale(0.06);
    });

    //PHYSICS
    this.physics.add.collider(this.baby, this.groundGroup);
    this.physics.add.collider(this.gun, this.groundGroup);
    this.physics.add.collider(this.mushroom, this.groundGroup);
    this.physics.add.collider(this.floateye, this.groundGroup);
    this.physics.add.collider(this.hearts, this.groundGroup);
    this.physics.add.collider(this.end, this.groundGroup);
    // this.physics.add.collider(this.mushroom, this.player);
    // this.physics.add.collider(this.floateye, this.player);

    this.physics.add.collider(this.hearts, this.platformGroupOne);
    this.physics.add.collider(this.baby, this.platformGroupOne);

    this.physics.add.collider(this.mushroom, this.baby);
    this.physics.add.collider(this.floateye, this.baby);
    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false,
    });

    //COLLISIONS
    this.physics.add.overlap(this.baby, this.gun, this.collectGun, null, this);
    // When the laser collides with the enemy
    this.physics.add.overlap(this.mushroom, this.lasers, this.hit, null, this);
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
    // set workd bounds to allow camera to follow the player
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
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>

    this.baby.update(this.cursors, this.jumpSound);
    this.mushroom.update();

    this.floateye.update();
    this.gun.update(
      time,
      this.baby,
      this.cursors,
      this.fireLaser // Callback fn for creating lasers
    );
    // this.monsterHit(this.mushroomGroup, player);
    // this.monsterHit(this.floateyeGroup, player);
  }

  collectHeart(baby, heart) {
    heart.disableBody(true, true);
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
    // Create a laser bullet and scale the sprite down
    const laser = new Laser(
      this,
      laserX,
      laserY,
      "laser",
      this.baby.facingLeft
    ).setScale(0.25);
    // Add our newly created to the group
    this.lasers.add(laser);
  }

  // make the laser inactive and insivible when it hits the enemy
  hit(mushroom, laser) {
    laser.setActive(false);
    laser.setVisible(false);
    mushroom.disableBody(true, true);
    this.killSound.play();
  }
  //animations for player and baby sprites
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
  }

  collectGun(baby, gun) {
    gun.disableBody(true, true);
    this.baby.armed = true;
  }
}
