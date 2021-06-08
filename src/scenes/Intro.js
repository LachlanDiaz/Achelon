class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    create() {
    cursors = this.input.keyboard.createCursorKeys();
    this.next_scene = false;


    this.bgMusic = this.sound.add('intro', {volume: 0.15});
    this.bgMusic.loop = true;
    this.bgMusic.play();


    this.intro_img = this.add.image(400, -62.5, 'intro_img').setScale(0.5);
    this.camera_focal =  this.left_nub = this.physics.add.sprite(400, 400).setBodySize(3, 3);

    this.textBoxes = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });

    this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
    this.cameras.main.setBounds(0, 0, 800, 800);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.camera_focal);

    this.textbox = new TextBox(this, ["It was said that God fell from the sky.",
     "A once proud being from the stars had strayed too far from the rest of their kind and fell to the ground below.",
     "The crash from the fall made the wind and mountains. Fire was born from their scream. And water was pooled from their tears.", 
     "And from the faint fragments of their soul that leaked out...",
     "We were born.", 
     "Not wanting our creator to suffer, we nursed them back to health.", 
     "In return, our creator helped us as well. Providing short winters, long springs, and bountiful harvests.",
     "But the God longed to reunite with their kin.",
     "And so they left. Slowly soaring into the sky in an attempt to see their family again.",
     "Not wanting to be abandoned by our creator, we followed.",
     "We started building a tower to follow our God in their pursuit for family; for were we not their family too?",
     "Some stayed. Some continued to follow.",
     "But as our God soared further and further away from our reach, the light from the lower levels of the tower began to fade.",
     "Life on the lower levels began to diminish, the nights became longer, the days became shorter, and food became scarcer.",
     "The bottom dwellers are suffering because we were abandoned by the one we needed most.",
     "That's why I have to complete it.",
     "I have to complete my rocket.",
     "I'm going to soar past the highest levels of the tower.",
     "Past all the upper dwellers who bask comfortably in the dregs of light left in our creator's trail.",
     "I'll rise above it all.",
     "And ask God to stay...",
     ""], 'text_box');
}


    update() {
        this.textbox.update();
        if (convo == false && !this.next_scene) {
            this.next_scene = true;

            // add tween to fade out audio
            this.tweens.add({
                targets: this.bgMusic,
                volume: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.tweens.add({
                targets: this.intro_img,
                alpha: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.time.delayedCall(3000, () => { this.scene.start('playScene'); });
        } 
        if (this.intro_img.y < 1000) {
            this.intro_img.y += 0.25;
        }
    }
}