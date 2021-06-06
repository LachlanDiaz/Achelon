class Mechanic extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 224, 160);

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
            if (!this.end_convo && !package_delivered) {
                this.scene.temp = new TextBox(this.scene, ["Hmmmmm...", "Whad'ya want?!", 
                "An Engine?!", "Yeah I got one lying around somewhere.", "But I want you to do something for me first alright!",
                "I need a package delivered to a client.", "If you do that I might be willin' to part the engine.",
                "*You got a Package*", "Deliver that to the house with the rusted red pipe, then we'll talk about that engine.", ""], 'text_box');
                this.end_convo = true;
                this.scene.textBoxes.add(this.scene.temp);
                inventory.set("Package", "Seems fragile, best not to shake it.");
            } else if (this.end_convo && !package_delivered) {
                this.scene.temp = new TextBox(this.scene, ["Deliver that to the house with the rusted red pipe, then we'll talk about that engine.",
                "And hurry it up will ya!",""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            } else if (!inventory.has("Engine") && package_delivered) {
                this.scene.temp = new TextBox(this.scene, ["Oh you delivered it?!", "Great! As promised here's your engine.",
                "You got an Engine!", "And a little extra something for your troubles.", "You got another coin!", "Now scram! I got work to do!", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
                inventory.set("Engine", "One of the parts needed to build your rocket.");
                ++coins;
                inventory.set("Coins", coins.toString());
            } else if (inventory.has("Engine") && package_delivered) {
                this.scene.temp = new TextBox(this.scene, ["Why are you still here?", "LEAVE!", ""], 'text_box');
                this.scene.textBoxes.add(this.scene.temp);
            }
        }
    }
}