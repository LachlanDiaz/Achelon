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
        if (pause && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            pause = false;
            this.scene.switch('playScene'); 
        }
    }
}