// game configureation
let config = {
    parent: 'myGame',
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, Pause, Pause2, Play2, Credits, GameOver]
};

let game = new Phaser.Game(config);
let cursors;