class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.movespeed = 1;
        this.moving = false;
    }

    update() {
        if(!this.moving && movement == true) {
            if (cursors.left.isDown && check_left) {
                this.moving = true;
                this.distance = 16;
                this.movement_left();
            } else if (cursors.right.isDown && check_right) {
                this.moving = true;
                this.distance = 16;
                this.movement_right();
            } else if (cursors.up.isDown && check_up) {
                this.moving = true;
                this.distance = 16;
                this.movement_up();
            } else if (cursors.down.isDown && check_down) {
                this.moving = true;
                this.distance = 16;
                this.movement_down();
            }
        }
    }
    test_movement() {
        this.pos = this.x - 16;
        this.setVelocityX(-16)
        this.moving = false;
    }
        

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

        