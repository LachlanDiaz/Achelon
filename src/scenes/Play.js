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
        this.textbox = new TextBox(this, "This is a super long text to check the width depth of the textbox", 'text_box');
        //this.textbox.setDepth(10);

        this.player = new Player(this);
        this.player.x = 16;
        this.player.y = 16;

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
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("yo");
        }
    }
} 