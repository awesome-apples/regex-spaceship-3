import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    constructor() {
      super("MapScene");
    }

    preload() {
        this.load.image("tiles", "assets/spritesheets/scifi_space_rpg_tiles.png");
        this.load.tilemapTiledJSON("map", "../assets/map/spaceship.json");

        // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
        // the player animations (walking left, walking right, etc.) in one image. For more info see:
        //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
        // If you don't use an atlas, you can do the same thing with a spritesheet, see:
        //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
        this.load.atlas("atlas", "../assets/atlas/atlas.png", "../assets/atlas/atlas.json");
    }

    create() {
        this.map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        this.tileset = this.map.addTilesetImage("spaceship", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0);
        this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
        this.wallLayer = this.map.createStaticLayer("Wall Stuff", this.tileset, 0, 0);
        this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });

        // "Spawn Point" is the name of object layer
        this.SpawnPoint = this.map.getObjectLayer("Spawn Point")["objects"];

        // Create a sprite with physics enabled via the physics system. The image used for the sprite has
        // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
        this.player = this.physics.add
        .sprite(this.SpawnPoint[0].x, this.SpawnPoint[0].y, "atlas", "misa-front")
        .setSize(30, 40)
        .setOffset(0, 24);

        this.physics.add.collider(this.player, this.worldLayer);

        // Watch the player and worldLayer for collisions, for the duration of the scene:
        // this.physics.add.collider(this.player, this.layer);

        // Create the player's walking animations from the texture atlas. These are stored in the global
        // animation manager so any sprite can access them.
        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-left-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-right-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-front-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
            prefix: "misa-back-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      
        this.cursors = this.input.keyboard.createCursorKeys();

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
            })
            .setScrollFactor(0)
            .setDepth(30);

        // Debug graphics
        this.input.keyboard.once("keydown_D", event => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
            this.worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

        });
    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
      
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);
      
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }
      
        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }
      
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);
      
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();
      
          // If we were moving, pick and idle frame to use
          if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
          else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
          else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
          else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
        }
    }

}