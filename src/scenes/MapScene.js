import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    constructor() {
      super("MapScene");
    }

    preload() {
        this.load.image("tiles", "assets/backgrounds/scifi_space_rpg_tiles.png");
        this.load.tilemapCSV("map", "../assets/map/tilemap.csv");
    }

    create() {
        // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
        this.map = this.make.tilemap({ key: "map", tileWidth: 48, tileHeight: 48 });
        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createStaticLayer(0, this.tileset, 0, 0); // layer index, tileset, x, y

        // Phaser supports multiple cameras, but you can access the default camera like this:
        this.camera = this.cameras.main;

        // Set up the arrows to control the camera
        this.cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.camera,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        });

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        this.add.text(16, 16, "Arrow keys to scroll", {
            font: "18px monospace",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#000000"
        }).setScrollFactor(0);

    }

    update(time, delta) {
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);
    }

}