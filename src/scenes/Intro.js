class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    create() {
    cursors = this.input.keyboard.createCursorKeys();
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
        if (convo == false) {
            this.scene.start('playScene');
        } 
    }
}