/** @type {import("../typings/phaser")} */
/* The above loads the phaser.d.ts file so that VSCode has autocomplete for the Phaser API.
If you experience problems with autocomplete, try opening the phaser.d.ts file and scrolling up and down in it.
That may fix the problem -- some weird quirk with VSCode. A new typing file is released with
every new release of Phaser. Make sure it's up-to-date!

At some point, the typings will
be officially added to the official release so that all you'll have to do is do:

npm install @types/phaser

But this hasn't happened yet!
*/

// Bring in all the scenes
import "phaser";
import MainScene from "./scenes/MainScene";
import FgScene from "./scenes/FgScene";
import LvlTwoScene from "./scenes/LvlTwoScene";
import LvlThreeScene from "./scenes/LvlThreeScene";
import LvlFourScene from "./scenes/LvlFourScene";
import InterludeOne from "./scenes/InterludeOne";
import InterludeTwo from "./scenes/InterludeTwo";
import InterludeThree from "./scenes/InterludeThree";
import FinishTitle from "./scenes/FinishTitle";
import config from "./config/config";

class Game extends Phaser.Game {
  constructor() {
    // Add the config file to the game
    super(config);

    //LEVELS
    this.scene.add("FgScene", FgScene);
    this.scene.add("LvlTwoScene", LvlTwoScene);
    this.scene.add("LvlThreeScene", LvlThreeScene);
    this.scene.add("LvlFourScene", LvlFourScene);
    //INTERLUDES
    this.scene.add("InterludeOne", InterludeOne);
    this.scene.add("InterludeTwo", InterludeTwo);
    this.scene.add("InterludeThree", InterludeThree);
    this.scene.add("FinishTitle", FinishTitle);
    // Add all the scenes
    // << ADD ALL SCENES HERE >>
    // this.scene.add("BgScene", BgScene);
    this.scene.add("MainScene", MainScene);

    // Start the game with the mainscene
    // << START GAME WITH MAIN SCENE HERE >>
    this.scene.start("MainScene");
  }
}
// Create new instance of game
window.onload = function () {
  window.game = new Game();
};
