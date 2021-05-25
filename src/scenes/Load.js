class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics
        this.load.image('text_box', 'img/text_box1.png');
        this.load.image('player', 'img/char_sprite.png');
        this.load.image('box', 'img/box.png');
        this.load.atlas('sprite_atlas', 'img/sprite_atlas.png', 'config/sprites.json');
        //load audio
        this.load.audio('bleep', 'audio/Bloop.wav');

        //loadfont

    }

    create() {
        this.scene.start('introScene');
        //create global anims
        this.anims.create({
            key: 'item_shine',
            frames: this.anims.generateFrameNames('sprite_atlas', {
                prefix: 'item_',
                start: 1,
                end: 9,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'dWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'D_walk_01'}, {frame: 'D_idle'}, {frame: 'D_walk_02'}
            ],
            frameRate: 10
        });
        this.anims.create({
            key: 'uWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'U_walk_01'}, {frame: 'U_idle'}, {frame: 'U_walk_02'}
            ],
            frameRate: 10
        });
        this.anims.create({
            key: 'lWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'L_walk_01'}, {frame: 'L_idle'}, {frame: 'L_walk_02'}
            ],
            frameRate: 10
        });
        this.anims.create({
            key: 'rWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'R_walk_01'}, {frame: 'R_idle'}, {frame: 'R_walk_02'}
            ],
            frameRate: 10
        });

    }
}