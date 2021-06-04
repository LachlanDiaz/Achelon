class Key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 736, 192);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(32,32);
        this.setOrigin(1, 1);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
        this.key_dead = false;
        //this.anims.play("item_shine")
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            console.log("get key");
            this.scene.temp = new TextBox(this.scene, ["You found your spare Lab Key", ""], 'text_box');
            this.end_convo = true;
            this.scene.textBoxes.add(this.scene.temp);
            inventory.set("Lab Key", "The spare key to your lab");
           
        }
        if (inventory.has("Lab Key") && convo == false && !this.key_dead) {
            this.body.destroy();
            this.key_dead = true;
            this.alpha = 0;
        }
        
    }
}