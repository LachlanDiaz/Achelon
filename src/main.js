// game configureation
var config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    scene: [Load]
};

var game = new Phaser.Game(config);
let cursors;

