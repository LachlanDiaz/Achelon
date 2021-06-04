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

        this.bgMusic = this.sound.add('junkyard', {volume: 0.10});
        this.bgMusic.loop = true;
        this.bgMusic.play();

        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        

        this.construct_player();

        
        
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

       
        
        this.balloon = this.physics.add.sprite(416, 800).setSize(32, 32);
        this.balloon.setOrigin(1, 1);
        this.balloon.anims.play('balloon_sway');


        this.char = new Char(this);
        this.physics.add.collider(this.char, this.player);
        this.char.setDepth(-1);

        this.key = new Key(this);

        this.box = new Box(this);

        //create map
        const map = this.make.tilemap({key: "tutorial"});
        const tileset00 = map.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        const frontLayer = map.createLayer("front", tileset00, 0, 0);
        frontLayer.setDepth(0);
        const worldLayer = map.createLayer("world", tileset00, 0, 0);
        worldLayer.setDepth(-2);
        const treeLayer = map.createLayer("tree edges", tileset00, 0, 0);
        treeLayer.setDepth(-2);
        const groundLayer = map.createLayer("ground", tileset00, 0, 0);
        groundLayer.setDepth(-3);
        //add collision
        worldLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.box, worldLayer); // please remove scene does not have box
        //debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.5);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.sign1 = this.physics.add.sprite(352, 416).setSize(32, 32);
        this.sign1.setOrigin(1, 1);

        this.sign2 = this.physics.add.sprite(512, 128).setSize(32, 32);
        this.sign2.setOrigin(1, 1);

        this.lab_door = this.physics.add.sprite(448, 128).setSize(32, 32);
        this.lab_door.setOrigin(1, 1);
        this.lab_door_locked = true;

        this.space = this.physics.add.sprite(416, 224).setSize(128, 128);
        this.space.setScale(0.25);
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

        this.textbox = new TextBox(this, ["test please find phyics body and press pace when facing it (arrow keys movement).", "another test", ""], 'text_box');
        this.textBoxes.add(this.textbox);

        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels).setZoom(2);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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
        if (this.physics.overlap(this.space, head) && convo == false) {
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
            this.textbox = new TextBox(this, ["My Lab", "I should probably find my spare key, it should be under the tree to the right of here", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //Lab puzzle logic
        if (this.physics.overlap(this.lab_door, head)) {

            if (this.lab_door_locked == true && convo == false) {
                if (!inventory.has("Lab Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["My lab enterance.", "It's Locked.", 
                    "I should probably find my spare key, it should be under the tree to the right of the lab", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                } else if (inventory.has("Lab Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox2 = new TextBox(this, ["The lab door unlocked.", ""], 'text_box');
                    this.textBoxes.add(this.textbox2);
                    this.lab_door_locked = false;
                }
            } else if (this.lab_door_locked == false && convo == false) {
                console.log("heyyy")
                this.scene_switch(this.scene.get('labScene'));
            }

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