class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title_bg').setOrigin(0, 0);
        this.rocket = this.add.sprite(400, 400).setScale(2);
        this.rocket.anims.play('rocket_blast');
        this.title = this.add.sprite(148, 180, 'sprite_atlas', 'title_sprite');
        this.title.setAlpha(0);
        cursors = this.input.keyboard.createCursorKeys();
        this.time.delayedCall(3000, () => { this.show_title() });
        this.time.delayedCall(9000, () => { this.remove_title() });
        this.time.delayedCall(60000, () => {this.to_title()} );
        this.time.delayedCall(63000, () => {this.scene.start('titleScene')} );
        this.bgMusic = this.sound.add('ending', {volume: 0.2});
        this.bgMusic.play();
    }

    update() {
        this.bg.tilePositionY -= 1;
    }

    show_title() {
        this.tweens.add({
            targets: this.title,
            alpha: 1,
            ease: 'Linear',
            duration: 3000,
        });
        this.time.delayedCall(6000, () => { this.remove_title() });
    }

    remove_title() {
        this.tweens.add({
            targets: this.title,
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
        });
    }

    to_title() {
        this.tweens.add({
            targets: [this.bg, this.rocket],
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
        });
    }
}