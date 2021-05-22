class Char extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 96, 96);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;