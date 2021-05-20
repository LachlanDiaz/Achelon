class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setSize(20, 20);
        this.movespeed = 64;
    }

    update() {
        if(movement == true) {
            if (cursors.left.isDown && check_left) {
                head = this.scene.left_nub;
                this.setVelocity(-this.movespeed, 0);
            } else if (cursors.right.isDown && check_right) {
                head = this.scene.right_nub;
                this.setVelocity(this.movespeed, 0);
            } else if (cursors.up.isDown && check_up) {
                head = this.scene.up_nub;
                this.setVelocity(0, -this.movespeed);
            } else if (cursors.down.isDown && check_down) {
                head = this.scene.down_nub;
                this.setVelocity(0, this.movespeed);
            } else {
                this.setVelocity(0, 0);
            }
        }
        if (cursors.shift.isDown) {
            this.movespeed = 112;
        } else {
            this.movespeed = 64;
        }
    }        

    //below are pixel precise tile movements without using velocity 
    //THIS TOOK TOO LONG WTF
    movement_left() {
        if (this.distance != 0) {
            let delay = 1000 /  60;
            this.scene.time.delayedCall(delay, () => {
                this.x -= this.movespeed;
                this.distance -= this.movespeed;
                this.movement_left();
            });
        }
        if (this.distance == 0) { 
            console.log(this.x, this.y);
            this.moving = false;
        }
    }
    movement_right() {
        if (this.distance != 0) {
            let delay = 1000 / game.loop.actualFps;
            this.scene.time.delayedCall(delay, () => {
                this.x += this.movespeed;
                this.distance -= this.movespeed;
                this.movement_right();
            });
        }
        if (this.distance == 0) { 
            console.log(this.x, this.y);
            this.moving = false;
        }
    }
    movement_up() {
        if (this.distance != 0) {
            let delay = 1000 / game.loop.actualFps;
            this.scene.time.delayedCall(delay, () => {
                this.y -= this.movespeed;
                this.distance -= this.movespeed;
                this.movement_up();
            });
        }
        if (this.distance == 0) {
            console.log(this.x, this.y);
            this.moving = false;
        }
    }
    movement_down() {
        if (this.distance != 0) {
            let delay = 1000 / game.loop.actualFps;
            this.scene.time.delayedCall(delay, () => {
                this.y += this.movespeed;
                this.distance -= this.movespeed;
                this.movement_down();
            });
        }
        if (this.distance == 0) {
            console.log(this.x, this.y);
            this.moving = false;
        }
    }
}

        