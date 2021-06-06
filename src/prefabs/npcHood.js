class npcHood extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 178, 526);

       
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
        this.end_convo = false;
        this.anims.play("hood_idle");
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            console.log("speaking");
            if (!this.end_convo) {
                this.scene.temp = new TextBox(this.scene, [".....", ".......", ".........",
                    "Their bleeding eyes...", "...gaze up through the fog...", "Searching for God.", ""], 'text_box');
                this.end_convo = true;
                forest_talked = true;
            } else if (this.end_convo == true && inventory.has("Stone Eyes") && !inventory.has("Fading Soul")){
                this.scene.temp = new TextBox(this.scene, [".....", "The blind one...", "...envies the watcher...", "...despite the pain...", ""], 'text_box');
            } else if (this.end_convo == true && inventory.has("Fading Soul")) {
                this.scene.temp = new TextBox(this.scene, [".....", "Nothing above...", "Nothing at all...", ""], 'text_box');
            } else{
                this.scene.temp = new TextBox(this.scene, [".....", "Bleeding eyes...", "...watch the mist.", ""], 'text_box');
            }
            this.scene.textBoxes.add(this.scene.temp);
        }
        
    }
}