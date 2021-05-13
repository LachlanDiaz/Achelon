class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.textbox = new TextBox(this, 'text_box');
        this.input.keyboard.on(cursors.up, function (event) {
            console.log('Hello from the A Key!');
          });
    }

    update() {
        this.textbox.update();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("yo");
        }
    }
} 