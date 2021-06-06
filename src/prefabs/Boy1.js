class Boy1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 416, 128);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setOrigin(1, 1);
        this.scene.temp;
        this.end_convo = false;
        this.anims.play("kid_jig");
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.end_convo && !inventory.has("Engine")) {
                this.scene.temp = new TextBox(this.scene, ["Hey, what's up?!", "Oh you're looking for an engine?", 
                "I'd talk to my Pop over at the mechanic shop.", "He might have one he's willin' to part with.", ""], 'text_box');
                this.end_convo = true;
                this.scene.textBoxes.add(this.scene.temp);
            } else if (this.end_convo && !inventory.has("Engine")) {
                this.scene.temp = new TextBox(this.scene, ["Talk to my Pop over at the mechanic shop.", "He might have an engine he's willin' to part with.", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            } else if (inventory.has("Engine")) {
                this.scene.temp = new TextBox(this.scene, ["Oh so he let you got the engine from him, huh?", "I'm not sure what you're using it for but good luck!", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            }
        }
    }
}