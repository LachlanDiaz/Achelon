class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image("tiles_01", "./assets/img/tileset_clean.png");
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("map_01", "./assets/config/map_01.json" );
        this.load.tilemapTiledJSON("tutorial", "./assets/config/tutorial.json" );
    }

    create() {

        //create background music
        this.bgMusic = this.sound.add('junkyard', {volume: 0.10});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        //initalize controls
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        
        //make texbox group
        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        //construct items you want under player
        this.coin1 = this.physics.add.sprite(416, 352).setSize(32, 32);
        this.coin1.setOrigin(1, 1);
        this.coin1_here = true;
        this.coin1.anims.play('coin_shine');

        this.coin2 = this.physics.add.sprite(544, 64).setSize(32, 32);
        this.coin2.setOrigin(1, 1);
        this.coin2_here = true;
        this.coin2.anims.play('coin_shine');

        //construct player
        this.construct_player();

        //start camera logic
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);
       
        //temp (move to next scene)
        this.balloon = this.physics.add.sprite(448, 800).setSize(32, 32);
        this.balloon.setOrigin(1, 1);
        this.balloon.anims.play('balloon_sway');

        //temp (move to next scene)
        this.char = new Char(this);
        this.physics.add.collider(this.char, this.player);
        this.char.setDepth(-1);

        //initaliize key object
        this.key = new Key(this);

        //initalize box object
        this.box = new Box(this);
        this.box.x = 608;
        this.box.y = 128;

        //create map
        this.map = this.make.tilemap({key: "tutorial"});
        this.tileset00 = this.map.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        this.frontLayer = this.map.createLayer("front", this.tileset00, 0, 0);
        this.frontLayer.setDepth(0);
        this.worldLayer = this.map.createLayer("world", this.tileset00, 0, 0);
        this.worldLayer.setDepth(-2);
        this.treeLayer = this.map.createLayer("tree edges", this.tileset00, 0, 0);
        this.treeLayer.setDepth(-2);
        this.groundLayer = this.map.createLayer("ground", this.tileset00, 0, 0);
        this.groundLayer.setDepth(-3);
        //add collision
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.box, this.worldLayer); // please remove scene does not have box
        //debug collision
        this.debugGraphics = this.add.graphics().setAlpha(0.5);
        this.worldLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        //some physics boxes to set up player interactinos with the space bar (use this logic).
        this.sign1 = this.physics.add.sprite(352, 416).setSize(32, 32);
        this.sign1.setOrigin(1, 1);

        this.sign2 = this.physics.add.sprite(512, 128).setSize(32, 32);
        this.sign2.setOrigin(1, 1);

        this.sign3 = this.physics.add.sprite(640, 128).setSize(32, 32);
        this.sign3.setOrigin(1, 1);

        this.lab_door = this.physics.add.sprite(448, 128).setSize(32, 32);
        this.lab_door.setOrigin(1, 1);
        this.lab_door_locked = true;

        this.fence = this.physics.add.sprite(416, 800).setSize(32, 32);
        this.fence.setOrigin(1, 1);
        this.fence_locked = true;

        //tutorial sprites and phyics
        this.space = this.physics.add.sprite(400, 304).setSize(128, 128);
        this.space.setScale(0.25);
        //this.space.setOrigin(4, 4);
        this.space.setOffset(64, 96);
        this.space.anims.play('space_press');

        this.arrows = this.add.sprite(this.player.x, this.player.y - 32).setSize(24, 24);
        this.arrows.setScale(1.5);
        this.arrows.anims.play('arrows_press');
        this.time.delayedCall(3000, () => { 
            this.tweens.add({
            targets: this.arrows,
            alpha: 0,
            ease: 'Linear',
            duration: 5000,
            }); 
        });

        //first textbox
        this.textbox = new TextBox(this, ["My Rocket is almost done.", "I just a few more things that i need to collect.", 
        "I need an engine, some fuel, and the core.", "Looks like I'll have to go out in the world to find the rest of what I need.",
        "I can use the [arrow keys] to start moving around.", ""], 'text_box');
        this.textBoxes.add(this.textbox);

        //more camera config
        this.cameras.main.setViewport(0, 0, this.map.widthInPixels, this.map.heightInPixels).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //set world bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

        

    update() {
        //General Object Updates
        this.textbox.update();
        this.player.update();
        this.char.update();
        this.move_nubs();
        this.key.update();
        this.box.update();

        //Tutorial Area Updates
        this.arrows.x = this.player.x;
        this.arrows.y = this.player.y - 32;
        if (this.physics.overlap(this.space, head) && convo == false && this.coin1_here) {
            this.space.setAlpha(1);
        }
        else {
            this.space.setAlpha(0);
        }

        //menu activation update
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //going to area 1
        if (this.physics.overlap(this.balloon, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.scene_switch(this.scene.get('area_01Scene'));
        }

        //sign updates
        if (this.physics.overlap(this.sign1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["My Super Cool Rocket Version 1.3123.314!", "Name Subject To Change...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign2, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["My Lab", "I should probably find my spare key, it should be under the tree to the right of here.", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign3, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["I can move boxes by holding [space] and moving in any direction.", "Looks like I'll need to move that box to get that coin behind it.", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //Lab puzzle logic
        if (this.physics.overlap(this.lab_door, head)) {

            if (this.lab_door_locked == true && convo == false) {
                if (!inventory.has("Lab Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["My lab enterance.", "It's Locked.", 
                    "I should probably find my spare key, it should be under the tree to the right of the lab.", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                } else if (inventory.has("Lab Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox2 = new TextBox(this, ["The lab door unlocked.", ""], 'text_box');
                    this.textBoxes.add(this.textbox2);
                    this.worldLayer.putTileAtWorldXY(43, 416, 96);
                    this.lab_door_locked = false;
                }
            } else if (this.lab_door_locked == false && convo == false) {
                console.log("heyyy")
                this.scene_switch(this.scene.get('labScene'));
            }
        }

        //bolt cutter logic
        if (this.physics.overlap(this.fence, head)) {
            if (this.fence_locked == true && convo == false) { 
                if (!inventory.has("Bolt Cutters") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["Looks Like I'll need something to cut the fence.", "I think I had a pair of bolt cutters back at the lab.", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                } else if (inventory.has("Bolt Cutters") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["You cut the fence.", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                    this.worldLayer.putTileAtWorldXY(0, 384, 768);
                    this.fence_locked = false;
                } 
            } else if (this.fence_locked == false && convo == false) {
                console.log("heyyy")
                this.scene_switch(this.scene.get('area_01Scene'));
            }
        }

        //coin1 logic
        if (this.physics.overlap(this.coin1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["Ah, I got a coin!", "I should try using [Space] to interact with the world around me.",
            "Oh! I can also use [Shift] to run.", "I should check how many coins I have by using [ctrl] to open my inventory!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
            this.coin1.body.destroy();
            this.space.body.destroy();
            this.coin1.setAlpha(0);
            this.coin1_here = false;
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