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
        this.load.image('credits', 'img/Credits.png');
        this.load.image('flash', 'img/flash.png');
        this.load.image('player', 'img/char_sprite.png');
        this.load.image('box', 'img/box.png');
        this.load.image('intro_img', 'img/achelon_intro.png');
        this.load.image('title_bg', 'img/menu_bg.png');
        this.load.image('title_fg', 'img/menu_fg.png');
        this.load.image('char2', 'img/char2.png');
        this.load.image('char3', 'img/char3.png');
        this.load.image('char4', 'img/char4.png');
        this.load.image('char5', 'img/girl_1.png');
        this.load.image('pastor', 'img/pastor.png');
        this.load.image('mechanic_sprite', 'img/mechanic_sprite.png');
        this.load.image('conductor_sprite', 'img/conductor_sprite_left.png');
        this.load.atlas('sprite_atlas', 'img/sprite_atlas.png', 'config/sprites.json');
        this.load.spritesheet('boy', 'img/kid_sprite.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('balloon', 'img/balloon.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('coin', 'img/coin.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 2
        });
        this.load.spritesheet('press_space', 'img/space_bar.png', {
            frameWidth: 260,
            frameHeight: 80,
            startFrame: 0,
            endFrame: 1
        });
        this.load.spritesheet('press_arrows', 'img/arrows.png', {
            frameWidth: 32,
            frameHeight: 21,
            startFrame: 0,
            endFrame: 1
        });
        //load audio
        this.load.audio('bleep', 'audio/Bloop.wav');
        this.load.audio('intro', 'audio/MusicBox.wav');
        this.load.audio('junkyard', 'audio/Junkyard.wav');
        this.load.audio('forest', 'audio/Castle.wav');
        this.load.audio('town', 'audio/Theme.wav');
        this.load.audio('title', 'audio/Main_Menu_Achelon.wav');
        this.load.audio('ending', 'audio/Ending.wav');
        this.load.audio('selecting', 'audio/Deselect.wav');
        this.load.audio('selected', 'audio/Select.wav');
    }

    create() {
        this.scene.start('titleScene');
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
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rocket_blast',
            frames: this.anims.generateFrameNames('sprite_atlas', {
                prefix: 'rocket_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'firefly_anim',
            frames: this.anims.generateFrameNames('sprite_atlas', {
                prefix: 'firefly_',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'smoke_anim',
            frames: this.anims.generateFrameNames('sprite_atlas', {
                prefix: 'smoke_',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'dWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'D_walk_01'}, {frame: 'D_idle'}, {frame: 'D_walk_02'}
            ],
            frameRate: 8
        });
        this.anims.create({
            key: 'uWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'U_walk_01'}, {frame: 'U_idle'}, {frame: 'U_walk_02'}
            ],
            frameRate: 8
        });
        this.anims.create({
            key: 'lWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'L_walk_01'}, {frame: 'L_idle'}, {frame: 'L_walk_02'}
            ],
            frameRate: 8
        });
        this.anims.create({
            key: 'rWalk',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'R_walk_01'}, {frame: 'R_idle'}, {frame: 'R_walk_02'}
            ],
            frameRate: 8
        });

        this.anims.create({
            key: 'hood_idle',
            defaultTextureKey: 'sprite_atlas',
            frames: [
                {frame: 'hoodguy_01'}, {frame: 'hoodguy_02'}
            ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'kid_jig',
            frames: this.anims.generateFrameNumbers('boy', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'balloon_sway',
            frames: this.anims.generateFrameNumbers('balloon', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'coin_shine',
            frames: this.anims.generateFrameNumbers('coin', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'space_press',
            frames: this.anims.generateFrameNumbers('press_space', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'arrows_press',
            frames: this.anims.generateFrameNumbers('press_arrows', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 2,
            repeat: -1
        });
    }
}