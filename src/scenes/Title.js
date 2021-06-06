class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu_bg').setOrigin(0, 0);
        this.fg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu_bg').setOrigin(0, 0);

        cursors = this.input.keyboard.createCursorKeys();

        this.menu_option = 1;

        this.add_pointer();

        this.bgMusic = this.sound.add('bgm_00', {volume: 0.5});
        this.bgMusic.loop = true;
        this.bgMusic.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
              this.selection();
        }


        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.pointer.destroy();
            this.menu_option--;
            if (this.menu_option > 2) {
                this.menu_option = 1;
            } else if (this.menu_option < 1) {
                this.menu_option = 2;
            }
            this.sound.play('sfx_selecting', { volume: 0.25 });
            this.add_pointer();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.pointer.destroy();
            this.menu_option++;
            if (this.menu_option > 2) {
                this.menu_option = 1;
            } else if (this.menu_option < 1) {
                this.menu_option = 2;
            }
            this.sound.play('sfx_selecting', { volume: 0.25 });
            this.add_pointer();
        }
    }
    add_pointer() {
        if (this.menu_option == 1) {
            this.pointer = this.add.image(80, 290, 'pointer');
        } else if (this.menu_option == 2) {
            this.pointer = this.add.image(56, 378, 'pointer');
        } 
    }

    selection() {
        if (this.menu_option == 1) {
            this.sound.play('sfx_selected', { volume: 0.25 });
            this.bgMusic.stop();
            this.scene.start('playScene');

        } else if (this.menu_option == 2) {
            this.sound.play('sfx_selected', { volume: 0.25 });
            this.bgMusic.stop();
            this.scene.start('creditsScene');
        } 
    }
}