class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image("tiles_01", "./assets/img/tileset_clean.png");
        this.load.tilemapTiledJSON("map_01", "./assets/config/map_01.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        

        this.construct_player();

        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, 800, 800);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.textbox = new TextBox(this, ["checking for version issues.", ""], 'text_box');

        this.textBoxes.add(this.textbox);
        

        this.char = new Char(this);
        this.char.setDepth(-1);

        //create map
        const map = this.make.tilemap({key: "map_01"});
        const tileset01 = map.addTilesetImage("tileset_clean", "tiles_01");
        //establishing layers
        const frontLayer = map.createLayer("front", tileset01, 0, 0);
        frontLayer.setDepth(0);
        const worldLayer = map.createLayer("world", tileset01, 0, 0);
        worldLayer.setDepth(-2);
        const groundLayer = map.createLayer("ground", tileset01, 0, 0);
        groundLayer.setDepth(-3);
        //add collision
        worldLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, worldLayer);
        //debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.5);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

        

    update() {
        this.textbox.update();
        this.player.update();
        this.char.update();
        this.move_nubs();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log(this.cameras.main.midPoint.x);
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 256;
        this.player.y = 256;
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