class Forest extends Phaser.Scene {
    constructor() {
        super("forestScene");
    }

    preload(){
        this.load.image("tiles", "./assets/img/tileset_forest.png");
        this.load.tilemapTiledJSON("forest_map", "./assets/config/forest.json" );
    }

    create() {

        //create background music
        this.bgMusic = this.sound.add('forest', {volume: 0.20});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        //initalize controls
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        
        //make texbox group
        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        //construct player
        this.construct_player();

        //start camera logic
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        //initialize npc(s) 
        this.npcHood = new npcHood(this);
        this.physics.add.collider(this.npcHood, this.player);
        this.npcHood.setDepth(-1);

        //initialize items
        this.eyes = new Eyes(this);
        this.soul = new Soul(this);

        //to_junkyard
        this.to_junkyard = this.physics.add.sprite(824, 512).setSize(32, 160);
        this.to_junkyard.setOrigin(1, 1);

        //create map
        this.map = this.make.tilemap({key: "forest_map"});
        this.tileset = this.map.addTilesetImage("tileset_forest", "tiles");
        //establishing layers
        this.frontLayer = this.map.createLayer("front", this.tileset, 0, 0);
        this.frontLayer.setDepth(0);
        this.worldLayer = this.map.createLayer("world", this.tileset, 0, 0);
        this.worldLayer.setDepth(-2);
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.groundLayer.setDepth(-3);
        //add collision
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.frontLayer.setCollisionByProperty({ collides: true });
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, this.frontLayer);
        this.physics.add.collider(this.player, this.groundLayer);
        //debug collision
        /*this.debugGraphics = this.add.graphics().setAlpha(0.2);
        this.worldLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        //fireflies!
        var fireflies = this.map.createFromObjects('Objects', {
            name: "firefly",
            key: 'sprite_atlas',
            frame: {frame: 'firefly_01'}
        })
        this.anims.play('firefly_anim', fireflies)

        //some physics boxes to set up player interactinos with the space bar (use this logic).
        this.door = this.physics.add.sprite(160, 384).setSize(32, 32);
        this.door.setOrigin(1, 1);

        this.window = this.physics.add.sprite(224, 384).setSize(32, 32);
        this.window.setOrigin(1, 1);

        //more camera config
        this.cameras.main.setViewport(0, 0, this.map.widthInPixels, this.map.heightInPixels).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //set world bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        
    }

        

    update() {
        //General Object Updates
        this.player.update();
        this.npcHood.update();
        this.move_nubs();
        this.eyes.update();
        this.soul.update();

        //menu activation update
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        if (this.physics.overlap(this.to_junkyard, head) && convo == false) {
            this.scene_switch(this.scene.get('area_01Scene'));
        }


        //sign updates
        if (this.physics.overlap(this.door, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["The door is broken and firmly wedged in place. I can't see anything inside.", "Probably best not to do anything rash.", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.window, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["There are two points of light in there, but the house is otherwise pitch-black.", "Why are those lights so steady?.", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 800;
        this.player.y = 480;
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

    //menu activation logic
    menu_activation() {
        curr_scene = this;
        menu_scene = this.scene.get('menuScene')
        menu_scene.place_inventory();
        this.scene.switch('menuScene');
        this.reconstruct_keybinds(menu_scene);
    }

    //switching between scene logic
    scene_switch(scene) {
        //prev_scene = this;
        next_scene = scene;
        //this.next_scene.place_inventory();
        this.scene.switch(next_scene);
        this.reconstruct_keybinds(next_scene);
    }

    //switching key logic
    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }
} 