class TextBox extends Phaser.GameObjects.Sprite {
    constructor(scene, text) {
        super(scene, game.config.width / 2, 520, 'text_box');
        scene.add.existing(this);
        movement = false;
        convo = true;
    }

    update() {
        if (convo == true && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("destoyed");
            this.destroy();
            convo = false;
        }
    }
}