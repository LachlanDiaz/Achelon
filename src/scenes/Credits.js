class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'credits').setOrigin(0, 0);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.bg.tilePositionY -= 1;
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('selected', {volume: 0.4});
            this.scene.start('titleScene');
        }
    }
}