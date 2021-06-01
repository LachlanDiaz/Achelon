class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.scene.switch(curr_scene); 
            this.reconstruct_keybinds(curr_scene);
        }
    }

    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }

    place_inventory() {
        if (this.text) this.text = "";
        this.pos_y = 100;
        let menuConfig = {
            fontFamily: 'font1',
            fontSize: '72px',
            color: '#FF0FF0',
            align: 'left',
            wordWrap: { width: 3600 }
        }
        for (let [key, value] of inventory) {
            this.text += this.add.text(100,this.pos_y, key +  ": " + value, menuConfig).setScale(0.1);
            this.pos_y += 100;

        }

    }
}