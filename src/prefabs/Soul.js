class Soul extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 96, 736);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(32,32);
        this.setOrigin(1, 1);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
        this.soul_dead = false;
        this.end_convo = false;
        //this.anims.play("item_shine")
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!inventory.has("Stone Eyes") && this.end_convo == false) {
                this.scene.temp = new TextBox(this.scene, ["Dark...", "So dark...", "Grant me eyes...",
                    "...so I can see God...", ""], 'text_box');
            }
            else if (inventory.has("Stone Eyes") && this.end_convo == false) {
                this.scene.temp = new TextBox(this.scene, ["Eyes!", "Grant me Eyes!", "Our soul for Eyes!",
                    ".....", "It gave me a faint white...light?", ""], 'text_box');
                inventory.set("Fading Soul", "A faint, flickering light.");
                inventory.delete("Stone Eyes");
                console.log("soul get yay");
                this.end_convo = true;
            }
            else {
                this.scene.temp = new TextBox(this.scene, ["...Please...", "Don't leave us...",
                    ".....", "Don't leave us here in the dark...", ""], 'text_box');        
            }
            this.scene.textBoxes.add(this.scene.temp);
            
           
        }
        
    }
}