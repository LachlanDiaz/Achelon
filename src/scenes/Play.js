class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.textbox = new TextBox(this, "yoooo", 'text_box');
    }

    update() {
        this.textbox.update();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("yo");
        }
    }
} 