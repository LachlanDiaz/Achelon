class Town01 extends Phaser.Scene {
    constructor() {
        super("town01Scene");
    }

    preload(){
        this.load.image("tiles_clean", "./assets/img/tileset_clean.png");
        this.load.tilemapTiledJSON("town01_map", "./assets/config/town_01.json" );
    }

    create() {

        /*create background music
        this.bgMusic = this.sound.add('town', {volume: 0.20});
        this.bgMusic.loop = true;
        this.bgMusic.play();*/

        //initalize controls
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        
        //make texbox group
        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.door_right = this.physics.add.sprite(544, 288).setSize(32,32);
        this.door_right.setOrigin(1, 1);

        this.door_left = this.physics.add.sprite(96, 288).setSize(32,32);
        this.door_left.setOrigin(1, 1);

        this.sign1 = this.physics.add.sprite(288, 448).setSize(32,32);
        this.sign1.setOrigin(1, 1);

        this.sign2 = this.physics.add.sprite(416, 64).setSize(32,32);
        this.sign2.setOrigin(1, 1);

        this.npc_01 = this.physics.add.sprite(384, 448, 'char3').setSize(32,32);
        this.npc_01.setOrigin(1, 1);
        this.npc_01.body.allowGravity = false;
        this.npc_01.body.immovable = true;
        this.npc_01_talked = false;

        //construct player
        this.construct_player();
        this.physics.add.collider(this.npc_01, this.player);

        //start camera logic
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        //create map
        this.map = this.make.tilemap({key: "town01_map"});
        this.tileset = this.map.addTilesetImage("tileset_clean", "tiles_clean");
        //establishing layers
        this.frontLayer = this.map.createLayer("front", this.tileset, 0, 0);
        this.frontLayer.setDepth(0);
        this.worldLayer = this.map.createLayer("world", this.tileset, 0, 0);
        this.worldLayer.setDepth(-2);
        this.groundLayer = this.map.createLayer("ground", this.tileset, 0, 0);
        this.groundLayer.setDepth(-3);
        //add collision
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayer);
        //debug collision
        this.debugGraphics = this.add.graphics().setAlpha(0.2);
        this.worldLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        //more camera config
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //set world bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.balloon = this.physics.add.sprite(352, 576);
        this.balloon.setOrigin(1, 1);
        this.balloon.anims.play('balloon_sway');

        //goto town02
        this.path = this.physics.add.sprite(352, 16).setSize(64, 16);
        this.path.setOrigin(1, 1);
    }

    update() {
        //General Object Updates
        this.player.update();
        this.move_nubs();

        //menu activation update
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //balloon logic
        if (this.physics.overlap(this.balloon, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            BGM.stop(); 
            BGM = this.sound.add('junkyard', {volume: 0.10});
            BGM.loop = true;
            BGM.play();
            this.scene_switch(this.scene.get('area_01Scene'));
        }

        //goto scene 2 logic
        if (this.physics.overlap(this.path, head) && convo == false) {
            this.scene_switch(this.scene.get('town02Scene'));
        }

        //Door & Sign Logics 
        if (this.physics.overlap(this.door_left, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "Doesn't seem to be anyone home...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_right, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "They might be out...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["Welcome to the Upper Levels!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign2, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["Viridian Village", "May our Creator's light forever shine!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //NPC dialouge stuff
        if (this.physics.overlap(this.npc_01, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_01_talked) {
                this.textbox = new TextBox(this, ["Oh hello!", "You don't look like you're from around here...", "In any case, welcome to the upper levels.",
                "We are blessed to have such an easly life so close to Achelon.", "You don't know that name?", "Why it's the name of our creator!", 
                "Though many have forgotten it since their departure. Some seem to think Achelon is a myth now...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.npc_01_talked = true;
            } else if (this.npc_01_talked) {
                this.textbox =  new TextBox(this, ["Achelon is our creator's name!", "Remember it well!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }

    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 352;
        this.player.y = 576;
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