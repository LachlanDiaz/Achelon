class Char extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.physics.overlap(scene.Player, this, this.dialog, null, scene);
    }


    update() {
        if (Player)
    }
}