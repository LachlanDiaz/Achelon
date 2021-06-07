class Area_01 extends Phaser.Scene {
    constructor() {
        super("area_01Scene");
    }

    preload(){
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("area_01", "./assets/config/area_01.json" );
    }

    create() {

        //uncomment for testing
        /*
        BGM = this.sound.add('junkyard', {volume: 0.00});
        BGM.loop = true;
        BGM.play();*/

        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        
        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.coin1 = this.physics.add.sprite(864, 64).setSize(32, 32);
        this.coin1.setOrigin(1, 1);
        this.coin1_here = true;
        this.coin1.anims.play('coin_shine');


        this.roots = this.physics.add.sprite(352, 1600).setSize(96, 32);
        this.roots.setOrigin(1, 1);
        this.root_gone = false;

        this.conductor = new Conductor(this);
        this.boy = new Boy1(this);
        
        this.construct_player();
        this.physics.add.collider(this.conductor, this.player);
        this.physics.add.collider(this.boy, this.player);

        this.box = new Box(this);
        this.box.x = 1184;
        this.box.y = 160;
        this.box.setDepth(-1); 

        //create map
        this.map01 = this.make.tilemap({key: "area_01"});
        this.tileset01 = this.map01.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        this.frontLayer01 = this.map01.createLayer("front", this.tileset01, 0, 0);
        this.frontLayer01.setDepth(0);
        this.worldLayer01 = this.map01.createLayer("world", this.tileset01, 0, 0);
        this.worldLayer01.setDepth(-2);
        this.groundLayer01 = this.map01.createLayer("ground", this.tileset01, 0, 0);
        this.groundLayer01.setDepth(-3);
        //add collision
        this.worldLayer01.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayer01);
        this.physics.add.collider(this.box, this.worldLayer01); // please remove scene does not have box
        //debug collision
        /*
        this.debugGraphics = this.add.graphics().setAlpha(0.5);
        this.worldLayer01.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map01.widthInPixels, this.map01.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.physics.world.setBounds(0, 0, this.map01.widthInPixels, this.map01.heightInPixels);

        //some physics boxes to set up player interactinos with the space bar (use this logic).
        this.sign1 = this.physics.add.sprite(1056, 224).setSize(32, 32);
        this.sign1.setOrigin(1, 1);

        this.to_tutorial = this.physics.add.sprite(352, 32).setSize(32, 32);
        this.to_tutorial.setOrigin(1, 1);

        this.mechanic_door = this.physics.add.sprite(1120, 160).setSize(32, 32);
        this.mechanic_door.setOrigin(1, 1);

        this.coin_door = this.physics.add.sprite(1344, 192).setSize(32, 32);
        this.coin_door.setOrigin(1, 1);

        this.right_house = this.physics.add.sprite(896, 896).setSize(32, 32);
        this.right_house.setOrigin(1, 1);
        this.wrong_person_talked = false;

        this.left_house = this.physics.add.sprite(640, 896).setSize(32, 32);
        this.left_house.setOrigin(1, 1);

        this.balloon = this.physics.add.sprite(1408, 1408);
        this.balloon.setOrigin(1, 1);
        this.balloon.anims.play('balloon_sway');
    }

    update() {
        //general prefab updates
        this.player.update();
        this.move_nubs();
        this.boy.update();
        this.conductor.update();  
        this.box.update();

        //menu updates
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //sign logic
        if (this.physics.overlap(this.sign1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["Roy's Mechanics", "Looks like a mechanic shop.", "I wonder if they have any engines for sale.", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //to_tutorial logic
        if (this.physics.overlap(this.to_tutorial, head) && convo == false) {
            this.scene_switch(this.scene.get('playScene'));
        }

        //to_mechanic logic
        if (this.physics.overlap(this.mechanic_door, head) && convo == false) {
            this.scene_switch(this.scene.get('mechanicScene'));
        }

         //to_coin_maze logic
         if (this.physics.overlap(this.coin_door, head) && convo == false) {
            this.scene_switch(this.scene.get('coinMazeScene'));
        }

        //coin1 logic
        if (this.physics.overlap(this.coin1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.textbox = new TextBox(this, ["Ah, another coin!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
            this.coin1.body.destroy();
            this.coin1.setAlpha(0);
            //coins = 4; //for testing purposes please delete after
            ++coins;
            inventory.set("Coins", coins.toString());
            this.coin1_here = false;
        }

        //package delivery logic
        if (this.physics.overlap(this.left_house, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            if (inventory.has("Package") && !package_delivered) {
                this.textbox = new TextBox(this, ["You knock on the door...", "Who is that?!", "Oh, you got a package for me?", 
                "That old fart still makin' kids do all his errands, huh.", "Well whatever. Thanks I guess...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                package_delivered = true;
                inventory.delete("Package");
            } else if (package_delivered) {
                this.textbox = new TextBox(this, ["You knock on the door...", "Huh, what you want a tip or something?!", "Go ask your boss then!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.right_house, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            if (inventory.has("Package") && !package_delivered && !this.wrong_person_talked) {
                this.textbox = new TextBox(this, ["You knock on the door...", "Who is that?!", "A package?", 
                "I think you got the wrong house kid...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.wrong_person_talked = true;
            } else if (inventory.has("Package") && !package_delivered && this.wrong_person_talked) {
                this.textbox = new TextBox(this, ["You knock on the door...", "Please leave me alone...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            } else if (package_delivered) {
                this.textbox = new TextBox(this, ["You knock on the door...", "There's no response...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }

        //Balloon Logic
        if (this.physics.overlap(this.balloon, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            if (!inventory.has("Ticket")) {
                this.textbox = new TextBox(this, ["I can take this balloon the the higher levels.", "But I need to purchase a ticket first.", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            } else if (inventory.has("Ticket")) {
                BGM.stop(); 
                BGM = this.sound.add('town', {volume: 0.20});
                BGM.loop = true;
                BGM.play();
                this.scene_switch(this.scene.get('town01Scene'));
            }
        }

        //Roots Logic
        if (this.physics.overlap(this.roots, head)) { 
            if (!this.root_gone) {
                if (!inventory.has("Rocket Fuel") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["A mess of roots blocks my path...", "I'll need to find a way to get rid of them.", "They look too thick to cut.", 
                    "I wonder if I can melt them with something...", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                } else if (inventory.has("Rocket Fuel") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                    this.textbox = new TextBox(this, ["*You used some of the Rocket Fuel to melt the roots in your path*", ""], 'text_box');
                    this.textBoxes.add(this.textbox);
                    this.frontLayer01.putTileAtWorldXY(0, 288, 1568);
                    this.frontLayer01.putTileAtWorldXY(0, 320, 1568);
                    this.frontLayer01.putTileAtWorldXY(0, 352, 1568);
                    this.root_gone = true;
                } 
            } else if (this.root_gone && convo == false) {
                BGM.stop(); 
                BGM = this.sound.add('forest', {volume: 0.10});
                BGM.loop = true;
                BGM.play();
                this.scene_switch(this.scene.get('forestScene'));
            }
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 336;
        this.player.y = 48;
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

    //switching between scene logic
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