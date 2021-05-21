class Key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 96, 128, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            console.log("get key");
            this.scene.temp = new TextBox(this.scene, ["You found a key", ""], 'text_box');
            this.end_convo = true;
            this.scene.textBoxes.add(this.scene.temp);
            inventory.set("key", "a key to something idk");
           
        }
        if (inventory.has("key") && convo == false) {
            this.body.destroy();
            this.alpha = 0;
        }
        
    }
}