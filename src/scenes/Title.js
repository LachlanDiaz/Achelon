class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'main_menu').setOrigin(0, 0);

        cursors = this.input.keyboard.createCursorKeys();

        this.menu_option = 1;

        this.add_pointer();

        this.tutorial = false;

        //define keys 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.bgMusic = this.sound.add('bgm_00', {volume: 0.5});
        this.bgMusic.loop = true;
        this.bgMusic.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
              this.selection();
        }


        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.pointer.destroy();
            this.menu_option--;
            if (this.menu_option > 3) {
                this.menu_option = 1;
            } else if (this.menu_option < 1) {
                this.menu_option = 3;
            }
            this.sound.play('sfx_selecting', { volume: 0.25 });
            this.add_pointer();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.pointer.destroy();
            this.menu_option++;
            if (this.menu_option > 3) {
                this.menu_option = 1;
            } else if (this.menu_option < 1) {
                this.menu_option = 3;
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
        } else if (this.menu_option == 3) {
           this.pointer = this.add.image(100, 500, 'pointer');
        }
    }

    selection() {
        if (this.menu_option == 1) {
            game.settings = {
                gameTimer: Infinity    
            }
            this.sound.play('sfx_selected', { volume: 0.25 });
            this.bgMusic.stop();
            if (this.tutorial == true) {
                this.scene.start('playScene');
            } else {
                this.scene.start('playScene2')
            }
        } else if (this.menu_option == 2) {
            this.sound.play('sfx_selected', { volume: 0.25 });
            this.bgMusic.stop();
            this.scene.start('creditsScene');
        } else if (this.menu_option == 3) {
            this.sound.play('sfx_selected', { volume: 0.25 });
           if (this.tutorial == true) {
               this.tutorial = false;
               this.ex.destroy();
           } else {
                this.tutorial = true;
                this.ex = this.add.image(142, 502, 'ex').setScale(.80);
           }
        }
    }
}