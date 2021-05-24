class Char extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 96, 96);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
        this.end_convo = false;
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            console.log("speaking");
            if (!this.end_convo) {
                this.scene.temp = new TextBox(this.scene, ["hello", "yo what's good", ""], 'text_box');
                this.end_convo = true;
            } else if (this.end_convo) {
                this.scene.temp = new TextBox(this.scene, ["this is my ending dialouge with a super long string to test for some boken stuff", "goodbye", ""], 'text_box');
            }
            this.scene.textBoxes.add(this.scene.temp);
        }
        
    }
}