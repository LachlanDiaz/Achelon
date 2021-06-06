class Eyes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 768, 192);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(32,32);
        this.setOrigin(1, 1);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.temp;
        this.eyes_dead = false;
        this.end_convo = false;
        //this.anims.play("item_shine")
    }


    update() {
        if (this.scene.physics.overlap(this, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (this.eyes_dead == false && !this.end_convo && forest_talked == true){
                console.log("grant us eyes");
                this.scene.temp = new TextBox(this.scene, ["Strange red fluid pours from the statue's face.", ".....",
                    "There are stone eyes in the angel's face. Perhaps I should take them.", ""], 'text_box');
                this.end_convo = true;
                this.eyes_dead = true;
                inventory.set("Stone Eyes", "Stone eyes taken from a bleeding statue. Still covered in damp red fluid.");
            } 
            else if (this.eyes_dead == false && !this.end_convo && forest_talked == false){
                this.scene.temp = new TextBox(this.scene, ["Red fluid pours endlessly from this statue's face.",
                    "It looks a lot like blood...", ""], 'text_box');
            }
            else {
                this.scene.temp = new TextBox(this.scene, ["The statue is still bleeding out of the hollow socket where its eyes were.", ""], 'text_box');
            }
            this.scene.textBoxes.add(this.scene.temp);
        }
        
        
    }
}