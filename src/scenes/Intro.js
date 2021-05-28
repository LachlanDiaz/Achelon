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


    this.test = this.add.image(400, 400, 'test_image').setScale(0.5);
    this.camera_focal =  this.left_nub = this.physics.add.sprite(400, 400).setBodySize(3, 3);

    this.textBoxes = this.add.group({
        runChildUpdate: true    // make sure update runs on group children
    });

    this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
    this.cameras.main.setBounds(0, 0, 800, 800);
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.startFollow(this.camera_focal);

    this.textbox = new TextBox(this, ["This is an into dialouge test", "some stuff about stroy here", "some other stuff about story", ""], 'text_box');
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
                targets: this.test,
                alpha: 0,
                ease: 'Linear',
                duration: 3000,
            });

            this.time.delayedCall(3000, () => { this.scene.start('playScene'); });
        } 
    }
}