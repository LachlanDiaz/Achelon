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
        
        

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        

        this.construct_player();

        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2.5);
        this.cameras.main.setBounds(0, 0, 800, 800);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.textbox = new TextBox(this, ["this is a super long sting to check the text width of the textbox, make sure not to go over the text limti so the string doesnt fly off the screen.", ""], 'text_box');

        this.textBoxes.add(this.textbox);

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