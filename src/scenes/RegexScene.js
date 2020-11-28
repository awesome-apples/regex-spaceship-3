import Phaser from "phaser";

export default class RegexScene extends Phaser.Scene {
    constructor() {
        super("RegexScene");
    }

    preload() {
    }

    create() {

        this.graphics = this.add.graphics();
        this.graphics2 = this.add.graphics();

        // for popup window
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0xffffff, 0.5);

        // for boxes
        this.graphics2.lineStyle(1, 0xffffff);
        this.graphics2.fillStyle(0xffffff, 1);

        // game windows: w: 800; h: 600
        // whole popup window: x, y, w, h

        // popup window
        this.graphics.strokeRect(25, 25, 750, 550);
        this.graphics.fillRect(25, 25, 750, 550);

        // regex problem prompt
        this.graphics2.strokeRect(50, 50, 325, 450);
        this.graphics2.fillRect(50, 50, 325, 450);
        this.add.text(55, 55, 'Example Problem', { fill: '#000000', fontSize: '20px', fontStyle: 'bold' });

        // input area
        this.graphics2.strokeRect(425, 50, 325, 225);
        this.graphics2.fillRect(425, 50, 325, 225);
        this.add.text(430, 55, 'Input Here', { fill: '#000000', fontSize: '20px', fontStyle: 'bold' });

        // output area
        this.graphics2.strokeRect(425, 325, 325, 175);
        this.graphics2.fillRect(425, 325, 325, 175);
        this.add.text(430, 330, 'Output Here', { fill: '#000000', fontSize: '20px', fontStyle: 'bold' });

        this.add.text(430, 285, 'Correct/Incorrect', { fill: '#000000', fontSize: '30px', fontStyle: 'bold' });

        const exit = this.add.text(55, 525, 'Return', { fill: '#000000', fontSize: '30px', fontStyle: 'bold' });
        exit.setInteractive();
        exit.on('pointerdown', () => {
            console.log("You returned to main room!");
            this.scene.sleep("RegexScene");
        });
        
        this.add.text(642, 525, 'Submit', { fill: '#000000', fontSize: '30px', fontStyle: 'bold' });
    }
}