class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.pos_y = 100;
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        let menuConfig = {
            fontFamily: 'font1',
            fontSize: '72px',
            color: '#FF0FF0',
            align: 'left',
            wordWrap: { width: 3600 }
        }
        for (let [key, value] of inventory) {
            this.add.text(100,this.pos_y, key +  ": " + value, menuConfig).setScale(0.1);
            this.pos_y += 100;

        }
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            switched = true;
            this.scene.switch('playScene'); 
            this.reconstruct_keybinds(this.scene.get('playScene'));
        }
    }

    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        switched = false;
    }
}