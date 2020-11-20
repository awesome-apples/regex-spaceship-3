import Player from "../entity/Player";
import Ground from "../entity/Ground";
// import Enemy from "../entity/Enemy";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";
import Baby from "../entity/Baby";
import Mushroom from "../entity/Mushroom";
import Floateye from "../entity/Floateye";
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
export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    this.collectGun = this.collectGun.bind(this);
    // this.fireLaser = this.fireLaser.bind(this);
    // this.hit = this.hit.bind(this);
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
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
    // this.load.image("ground", "assets/sprites/ground.png");
    // this.load.image("brandon", "assets/sprites/brandon.png");
    this.load.image("gun", "assets/sprites/gun.png");
    this.load.image("laser", "assets/sprites/laserBolt.png");

    this.load.image(
      "far-buildings",
      "assets/backgrounds/cyberpunk/long/far-buildings.png"
    );
    this.load.image(
      "back-buildings",
      "assets/backgrounds/cyberpunk/long/back-buildings.png"
    );
    this.load.image(
      "foreground",
      "assets/backgrounds/cyberpunk/long/foreground.png"
    );
    this.load.image("ground", "assets/backgrounds/cyberpunk/long/ground.png");

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
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

    let x = -150;
    for (let i = 0; i < count; ++i) {
      const m = this.add
        .image(x, game.config.height * 0.5, texture)
        .setScale(3.1)
        .setScrollFactor(scrollFactor);
      x += m.width * 1.8;
    }
  }
  createMonster(x, y, texture) {
    if (texture === "mushroom") {
      x = 650;
      y = 200;
      this.mushroomGroup.create(x, y, texture).setScale(2.3);
    } else if (texture === "floateye") {
      x = 650;
      y = 200;
      this.floateyeGroup.create(x, y, texture).setScale(2.3);
    }
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    const width = game.config.width;
    const height = game.config.height;
    const totalWidth = width * 20;

    //BACKROUND
    this.createLooped(totalWidth, "far-buildings", 0.08);
    this.createLooped(totalWidth, "back-buildings", 0.18);
    this.createLooped(totalWidth, "foreground", 0.23);

    //GROUND
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(0, 570, 40, "ground");
    //MUSHROOM GROUP
    this.mushroomGroup = this.physics.add.group({ classType: Mushroom });
    //FLOATEYE GROUP
    this.floateyeGroup = this.physics.add.group({ classType: Floateye });
    //MUSHROOM
    this.createMonster(mushX, mushY, "mushroom");
    this.createMonster(floatX, floatY, "floateye");
    // this.mushroom = new Mushroom(this, 650, 200, "mushroom").setScale(2.3);
    // this.floateye = new Floateye(this, 650, 50, "floateye").setScale(2.3);

    ///// SPRITES
    this.player = new Player(this, 100, 200, "bubble").setScale(2);
    // this.enemy = new Enemy(this, 600, 400, "brandon").setScale(0.25);
    this.gun = new Gun(this, 300, 400, "gun").setScale(0.25);
    this.baby = new Baby(this, 30, 200, "baby").setScale(2);

    //PHYSICS
    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.baby, this.groundGroup);

    this.physics.add.collider(this.gun, this.groundGroup);
    this.physics.add.collider(this.mushroom, this.groundGroup);
    this.physics.add.collider(
      this.mushroomGroup,
      this.player,
      // monsterHit,
      null,
      this
    );
    this.physics.add.collider(
      this.mushroomGroup,
      this.baby,
      // monsterHit,
      null,
      this
    );
    this.physics.add.collider(
      this.floateyeGroup,
      this.player,
      // monsterHit,
      null,
      this
    );
    this.physics.add.collider(
      this.floateyeGroup,
      this.baby,
      // monsterHit,
      null,
      this
    );
    this.physics.add.collider(this.floateye, this.groundGroup);

    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false,
    });

    //MOVEMENT
    this.cursors = this.input.keyboard.createCursorKeys();

    //CAMERA
    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, width * 20, height);
    this.cameras.main.startFollow(this.player);

    //COLLISIONS
    this.physics.add.overlap(
      this.player,
      this.baby,
      this.gun,
      this.collectGun,
      null,
      this
    );
    // When the laser collides with the enemy
    // this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);

    //ANIMATIONS
    this.createAnimations();
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }
  // monsterHit(player) {
  //   this.physics.pause();
  //   player.setTint(0xff0000);
  //   player.anims.play("jump");
  //   gameOver = true;
  // }
  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.player.update(this.cursors);
    this.baby.update(this.cursors);
    this.mushroom.update();
    this.floateye.update();
    this.gun.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser // Callback fn for creating lasers
    );
    // this.monsterHit(this.mushroomGroup, player);
    // this.monsterHit(this.floateyeGroup, player);
  }

  fireLaser(x, y, left) {
    // These are the offsets from the player's position that make it look like
    // the laser starts from the gun in the player's hand
    const offsetX = 56;
    const offsetY = 14;
    const laserX =
      this.player.x + (this.player.facingLeft ? -offsetX : offsetX);
    const laserY = this.player.y + offsetY;

    // Create a laser bullet and scale the sprite down
    const laser = new Laser(
      this,
      laserX,
      laserY,
      "laser",
      this.player.facingLeft
    ).setScale(0.25);
    // Add our newly created to the group
    this.lasers.add(laser);
  }

  // make the laser inactive and insivible when it hits the enemy
  //ENEMY LASER INTERACTIONS
  // hit(enemy, laser) {
  //   laser.setActive(false);
  //   laser.setVisible(false);
  // }
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

  collectGun(player, gun) {
    gun.disableBody(true, true);
    this.player.armed = true;
  }
}
