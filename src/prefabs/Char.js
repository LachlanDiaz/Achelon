class Char extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.num = 1;

    }


    update() {
        if (this.scene.physics.overlap(this, this.scene.nubs) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false && this.num == 1) {
            this.num++
            console.log("speaking");
            this.scene.temp = new TextBox(this.scene, "hello", 'text_box');
            this.scene.textBoxes.add(this.scene.temp);
        }
    }
}