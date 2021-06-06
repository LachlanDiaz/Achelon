class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title_bg').setOrigin(0, 0);
        this.fg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title_fg').setOrigin(0, 0);

        cursors = this.input.keyboard.createCursorKeys();

        this.menu_option = 1;

        this.add_pointer();

        this.bgMusic = this.sound.add('title', {volume: 0.2});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        this.selection_made = false;
    }

    update() {

        this.bg.tilePositionY -= 1;


        if (!this.selection_made) {
            if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.selection();
            }

            if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
                this.pointing.destroy();
                this.pointed.destroy();
                this.menu_option--;
                if (this.menu_option > 2) {
                    this.menu_option = 1;
                } else if (this.menu_option < 1) {
                    this.menu_option = 2;
                }
                this.sound.play('selecting', { volume: 0.4 });
                this.add_pointer();
            } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
                this.pointing.destroy();
                this.pointed.destroy();
                this.menu_option++;
                if (this.menu_option > 2) {
                    this.menu_option = 1;
                } else if (this.menu_option < 1) {
                    this.menu_option = 2;
                }
                this.sound.play('selecting', { volume: 0.4 });
                this.add_pointer();
            }
        }
    }
    add_pointer() {
        if (this.menu_option == 1) {
            this.pointing = this.add.image(80, 764, "sprite_atlas", "play_01");
            this.pointed =  this.add.image(680, 764, "sprite_atlas", "credits_00");
        } else if (this.menu_option == 2) {
            this.pointing = this.add.image(680, 764, "sprite_atlas", "credits_01");
            this.pointed = this.add.image(80, 764, "sprite_atlas", "play_00");
        } 
    }

    selection() {
        if (this.menu_option == 1) {
            this.sound.play('selected', { volume: 0.4 });
            this.selection_made = true;
            this.tweens.add({
                targets: this.bgMusic,
                volume: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.tweens.add({
                targets: [this.bg, this.fg, this.pointed, this.pointing],
                alpha: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.time.delayedCall(3000, () => { this.scene.start('introScene'); });

        } else if (this.menu_option == 2) {
            this.sound.play('selected', { volume: 0.4 });
            this.selection_made = true;

            this.tweens.add({
                targets: this.bgMusic,
                volume: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.tweens.add({
                targets: [this.bg, this.fg, this.pointed, this.pointing],
                alpha: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.time.delayedCall(3000, () => { this.scene.start('creditsScene'); });
        } 
    }
}