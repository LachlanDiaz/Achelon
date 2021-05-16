class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image("tiles_01", "./assets/img/town_tilemap_01.png");
        this.load.tilemapTiledJSON("map_01", "./assets/config/map01.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        
        //this.textbox.setDepth(10);

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.textbox = new TextBox(this, "This is a super long text to check the width depth of the textbox", 'text_box');

        this.textBoxes.add(this.textbox);

        this.construct_player();
        this.char = new Char(this);

        //create map
        const map = this.make.tilemap({key: "map_01"});
        const tileset01 = map.addTilesetImage("town_tileset_01", "tiles_01");
        //establishing layers
        const bgLayer = map.createLayer("bg", tileset01, 0, 0);
        bgLayer.setDepth(-1);
        const groundLayer = map.createLayer("ground", tileset01, 0, 0);
        groundLayer.setDepth(-1);
        const frontLayer = map.createLayer("front", tileset01, 0, 0);
        frontLayer.setDepth(-1);

    }

        

    update() {
        this.textbox.update();
        this.player.update();
        this.char.update();
        this.move_nubs();
        this.checking();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("yo");
        }
    }

    checking() {
        if (this.physics.overlap(this.left_nub, this.char)) {
            check_left = false;
        } else {
            check_left = true;
        }
        if (this.physics.overlap(this.right_nub, this.char)) {
            check_right = false;
        } else {
            check_right = true;
        }
        if (this.physics.overlap(this.up_nub, this.char)) {
            check_up = false;
        } else {
            check_up = true;
        }
        if (this.physics.overlap(this.down_nub, this.char)) {
            check_down = false;
        } else {
            check_down = true;
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 64;
        this.player.y = 64;
        this.nubs = this.add.group();
        this.left_nub = this.physics.add.sprite(this.player.x - 17, this.player.y).setBodySize(3, 3);
        this.nubs.add(this.left_nub);
        this.right_nub = this.physics.add.sprite(this.player.x + 17, this.player.y).setBodySize(3, 3);
        this.nubs.add(this.right_nub);
        this.up_nub = this.physics.add.sprite(this.player.x, this.player.y - 17).setBodySize(3, 3);
        this.nubs.add(this.up_nub);
        this.down_nub = this.physics.add.sprite(this.player.x, this.player.y + 17).setBodySize(3, 3);
        this.nubs.add(this.down_nub);

    }

    //updates the nubs positions to follow the player. 
    move_nubs() {
        //left nub
        this.left_nub.x = this.player.x - 17;
        this.left_nub.y = this.player.y;
        //right nub
        this.right_nub.x = this.player.x + 17;
        this.right_nub.y = this.player.y;
        //up nub
        this.up_nub.x = this.player.x;
        this.up_nub.y = this.player.y - 17;
        //down nub
        this.down_nub.x = this.player.x;
        this.down_nub.y = this.player.y + 17;


    }
} 