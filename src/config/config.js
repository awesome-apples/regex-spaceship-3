// import FgScene from "../scenes/FgScene";
// import FgScene from "../scenes/FgScene";

import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

export default {
  type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
  // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 800, // Game width in pixels
  height: 600, // Game height in pixels
  render: {
    pixelArt: true,
  },
  scale: {
    parent: "mygame",
    // autoCenter: true,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  //  We will be expanding physics later
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }, // Game objects will be pulled down along the y-axis
      // The number 1500 is arbitrary. The higher, the stronger the pull.
      // A negative value will pull game objects up along the y-axis
      debug: false, // Whether physics engine should run in debug mode
    },
  },
  plugins: {
    global: [
      {
        key: "rexRoundRectanglePlugin",
        plugin: RoundRectanglePlugin,
        start: true,
      },
    ],
  },
  dom: {
    createContainer: true,
  },
  scene: [],
  points: 0,
  health: 0,
  pointsText: 0,
  healthText: 0,
  playerTime: "",
  beginTime: 0,
  usernameOne: "",
  login: false,
};
