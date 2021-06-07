class CoinMaze extends Phaser.Scene {
    constructor() {
        super("coinMazeScene");
    }

    preload(){
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("coin_maze", "./assets/config/coin_room.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.coin1 = this.physics.add.sprite(384, 64).setSize(32, 32);
        this.coin1.setOrigin(1, 1);
        this.coin1_here = true;
        this.coin1.anims.play('coin_shine');

        this.construct_player();

        //create map
        this.coins = this.make.tilemap({key: "coin_maze"});
        this.tilesetcoins = this.coins.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        this.frontLayercoins = this.coins.createLayer("front", this.tilesetcoins, 0, 0);
        this.frontLayercoins.setDepth(0);
        this.worldLayercoins = this.coins.createLayer("world", this.tilesetcoins, 0, 0);
        this.worldLayercoins.setDepth(-2);
        this.groundLayercoins = this.coins.createLayer("ground", this.tilesetcoins, 0, 0);
        this.groundLayercoins.setDepth(-3);
        //add collision
        this.worldLayercoins.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayercoins);

        //debug collision
        /*
        this.debugGraphics = this.add.graphics().setAlpha(0.5);
        this.worldLayercoins.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        this.outside_door = this.physics.add.sprite(224, 816).setSize(32, 16);
        this.outside_door.setOrigin(1, 1);
        
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.coins.widthInPixels, this.coins.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.physics.world.setBounds(0, 0, this.coins.widthInPixels, this.coins.heightInPixels)
    }

    update() {
        this.player.update();
        this.move_nubs();

        //menu logic
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //Outside Door logic
        if (this.physics.overlap(this.outside_door, head)  && convo == false) {
            this.scene_switch(this.scene.get('area_01Scene'));
        }

        //coin1 logic
        if (this.physics.overlap(this.coin1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["Ah, another coin!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
            this.coin1.body.destroy();
            this.coin1.setAlpha(0);
            ++coins;
            inventory.set("Coins", coins.toString());
            this.coin1_here = false;
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 208;
        this.player.y = 800;
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

    menu_activation() {
        curr_scene = this;
        menu_scene = this.scene.get('menuScene')
        menu_scene.place_inventory();
        this.scene.switch('menuScene');
        this.reconstruct_keybinds(menu_scene);
    }

    scene_switch(scene) {
        //prev_scene = this;
        next_scene = scene;
        //this.next_scene.place_inventory();
        this.scene.switch(next_scene);
        this.reconstruct_keybinds(next_scene);
    }

    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }
} 