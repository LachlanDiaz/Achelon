class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.collideWorldBounds=true;
        this.setSize(18, 16);
        this.body.setOffset(7, 14);
        this.movespeed = 64;
        this.lastKey = 0;
    }

    update() {
        //animation direction code adapted from Michael Hadley's Modular Game World example
        if(movement == true) {
            if (cursors.left.isDown && check_left) {
                head = this.scene.left_nub;
                this.setVelocity(-this.movespeed, 0);
                this.anims.play("lWalk", true);
                this.lastKey = 0;
            } else if (cursors.right.isDown && check_right) {
                head = this.scene.right_nub;
                this.setVelocity(this.movespeed, 0);
                this.anims.play("rWalk", true);
                this.lastKey = 1;
            } else if (cursors.up.isDown && check_up) {
                head = this.scene.up_nub;
                this.setVelocity(0, -this.movespeed);
                this.anims.play("uWalk", true);
                this.lastKey = 2;
            } else if (cursors.down.isDown && check_down) {
                head = this.scene.down_nub;
                this.setVelocity(0, this.movespeed);
                this.anims.play("dWalk", true);
                this.lastKey = 3;
            } else {
                this.setVelocity(0, 0);
                this.anims.stop();
            }
        } else {
            this.setVelocity(0,0);
            this.anims.stop();
        }
        if (cursors.shift.isDown) {
            this.movespeed = 112;
        } else {
            this.movespeed = 64;
        }

        // when no longer moving, pick an idle frame    
        if (Math.abs(this.body.velocity.x) == 0 && Math.abs(this.body.velocity.y) == 0 && this.lastKey == 0) this.setTexture("sprite_atlas", "L_idle");
        else if (Math.abs(this.body.velocity.x) == 0 && Math.abs(this.body.velocity.y) == 0 && this.lastKey == 1) this.setTexture("sprite_atlas", "R_idle");
        else if (Math.abs(this.body.velocity.x) == 0 && Math.abs(this.body.velocity.y) == 0 && this.lastKey == 2) this.setTexture("sprite_atlas", "U_idle");
        else if (Math.abs(this.body.velocity.x) == 0 && Math.abs(this.body.velocity.y) == 0 && this.lastKey == 3) this.setTexture("sprite_atlas", "D_idle");
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

        