class Conductor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 1280, 1440, 'conductor_sprite');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setOrigin(1, 1);
        this.scene.temp;
        this.end_convo = false;
        //this.anims.play("kid_jig");
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.end_convo && coins < 5) {
                this.scene.temp = new TextBox(this.scene, ["Oh hello...", "Oh you want access to the higher levels?", 
                "Of course! For 5 coins you can leave this trash...erm...I mean...rustic area for a chance to be closer to our one and only creator!", "Hmmm it looks like you only have " + coins + " coins.",
                "Come back when you have enough.", ""], 'text_box');
                this.end_convo = true;
                this.scene.textBoxes.add(this.scene.temp);
            } else if (this.end_convo && coins < 5) {
                this.scene.temp = new TextBox(this.scene, ["Looks like you only have " + coins + " coins...",
                "Feel free to come back if you have enough.",""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            } else if (coins >= 5 && !inventory.has("Ticket")) {
                this.scene.temp = new TextBox(this.scene, ["Looks like you have enough coins to purchase a ticket to the higher levels.", 
                "You got a ticket to the higher levels", "Please approach the balloon to take a ride to the higher levels.", "Enjoy your ride!", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
                inventory.set("Ticket", "A ticket to the higher levels.");
                inventory.delete("Coins");
            } else if (coins >= 5 && inventory.has("Ticket")) {
                this.scene.temp = new TextBox(this.scene, ["Enjoy your ride!", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            }
        }
    }
}