class Box extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player) {
        super(scene, 96, 200, 'box');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.scene.physics.add.collider(this, this.scene.player);
        this.setOrigin(1, 1);
        
    }
    
    update() {
        if (this.scene.physics.overlap(this, head)) {
            this.grab_point = head;
        }
        if (this.scene.physics.overlap(this, this.grab_point) && cursors.space.isDown && convo == false) {
            console.log(this.scene.player.body.velocity.x);
            //this.body.velocity = this.scene.player.body.velocity;
            this.setVelocity(this.scene.player.body.velocity.x, this.scene.player.body.velocity.y);
        } else {
            this.setVelocity(0, 0);
        }
    }
}
