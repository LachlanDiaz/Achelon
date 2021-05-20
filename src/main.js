// game configureation
// keep me honest
'use strict';

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        //mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Play],
    pixelArt: true
};

let game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let cursors;
let head;
let dialogSpeed = 3;
let convo = false;
let movement = true;
let check_left = true;
let check_right = true;
let check_up = true;
let check_down = true;



