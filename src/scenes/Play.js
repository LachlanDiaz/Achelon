class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.textbox = new TextBox(this, "This is a super long text to check the width depth of the textbox", 'text_box');

        this.player = new Player(this);
        this.player.x = 16;
        this.player.y = 16;
    }

    update() {
        this.textbox.update();
        this.player.update();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("yo");
        }
    }
} 