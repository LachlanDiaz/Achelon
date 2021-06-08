class Town02 extends Phaser.Scene {
    constructor() {
        super("town02Scene");
    }

    preload(){
        this.load.image("tiles_cleaan", "./assets/img/tileset_clean.png");
        this.load.tilemapTiledJSON("town02_map", "./assets/config/town_02.json" );
    }

    create() {

        //initalize controls
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        
        //make texbox group
        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.door_top_right = this.physics.add.sprite(352, 192).setSize(32, 32);
        this.door_top_right.setOrigin(1, 1);

        this.door_top_left = this.physics.add.sprite(96, 192).setSize(32, 32);
        this.door_top_left.setOrigin(1, 1);

        this.door_bot_right = this.physics.add.sprite(352, 384).setSize(32, 32);
        this.door_bot_right.setOrigin(1, 1);

        this.door_bot_left = this.physics.add.sprite(96, 384).setSize(32, 32);
        this.door_bot_left.setOrigin(1, 1);

        this.sign1 = this.physics.add.sprite(736, 384).setSize(32, 32);
        this.sign1.setOrigin(1, 1);

        this.sign2 = this.physics.add.sprite(864, 384).setSize(32, 32);
        this.sign2.setOrigin(1, 1);

        this.gate = this.physics.add.sprite(800, 352).setSize(32, 32);
        this.gate.setOrigin(1, 1);

        this.npc_02 = this.physics.add.sprite(608, 408, 'char2').setSize(32, 32);
        this.npc_02.setOrigin(1, 1);
        this.npc_02.body.allowGravity = false;
        this.npc_02.body.immovable = true;
        this.npc_02_talked = false;

        this.npc_03 = this.physics.add.sprite(512, 160, 'char4').setSize(32, 32);
        this.npc_03.setOrigin(1, 1);
        this.npc_03.body.allowGravity = false;
        this.npc_03.body.immovable = true;
        this.npc_03_talked = false;

        this.npc_04 = this.physics.add.sprite(704, 576, 'char5').setSize(32,32);
        this.npc_04.setOrigin(1, 1);
        this.npc_04.body.allowGravity = false;
        this.npc_04.body.immovable = true;
        this.npc_04_talked = false;

        this.pastor = this.physics.add.sprite(800, 256, 'pastor').setSize(32,32);
        this.pastor.setOrigin(1, 1);
        this.pastor.body.allowGravity = false;
        this.pastor.body.immovable = true;
        this.pastor_talked = false;

        //construct player
        this.construct_player();
        this.physics.add.collider(this.npc_02, this.player);
        this.physics.add.collider(this.npc_03, this.player);
        this.physics.add.collider(this.npc_04, this.player);
        this.physics.add.collider(this.pastor, this.player);

        //start camera logic
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        //create map
        this.map = this.make.tilemap({key: "town02_map"});
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
        /*
        this.debugGraphics = this.add.graphics().setAlpha(0.2);
        this.worldLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        //more camera config
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        //set world bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        ///goto town01
        this.path = this.physics.add.sprite(864, 656).setSize(64, 16);
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

        //goto scene 1 logic
        if (this.physics.overlap(this.path, head)  && convo == false) {
            this.scene_switch(this.scene.get('town01Scene'));
        }

        //Door & Sign Logics 
        if (this.physics.overlap(this.door_top_left, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "*You hear rustling behind the door, but there's no response.*", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_top_right, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "They might be out...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_bot_right, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "What?! Go away!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_bot_left, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "They might be out...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign1, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["Viridian Church", "May our Creator's light forever shine!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.sign2, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["Viridian Church", "From the blood of the Creator comes light!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //NPC dialouge stuff 
        if (this.physics.overlap(this.npc_02, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_02_talked) {
                this.textbox = new TextBox(this, ["Can you step away from me please. You look filthy!", "Goodness. I don't know why we keep letting in people from the lower levels!",
                "Do they want our peaceful town to end up like that mess down below?",""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.npc_02_talked = true;
            } else if (this.npc_02_talked) {
                this.textbox =  new TextBox(this, ["Get away from me!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.npc_03, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_03_talked) {
                this.textbox = new TextBox(this, ["You look funny.", "What's wrong with your clothes? They're filthy.",
                "Oh, you're from down below aren't you?", "Don't worry, I don't mind. But why are you up here?", ".....",
                "Fuel? Do they not have fuel down below?", "Or did you use it all up trying to keep your lights running?",
                "Maybe the pastor can help you.", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.npc_03_talked = true;
            } else if (this.npc_03_talked) {
                this.textbox =  new TextBox(this, ["Try talking to the pastor. Maybe he can help you.", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.npc_04, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_04_talked) {
                this.textbox = new TextBox(this, ["Hello!", "What - rocket fuel? What are you on about?",
                "Did you run out of coal at the lower levels or something?", "I don't know about this rocket of yours, but the pastor might be able to help.",
                "You'll need a key to get through the gate though. People have been uneasy lately, with the light fading...", "I'm not one to turn down someone in need. You can have my spare.",
                "*You got the church gate key!*", "Good luck with your rocket", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                inventory.set("Gate Key", "Use to unlock the gate to the church");
                this.npc_04_talked = true;
            } else if (this.npc_04_talked) {
                this.textbox =  new TextBox(this, ["A rocket huh...", "You people from down below have funny ideas...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.pastor, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.pastor_talked) {
                this.textbox = new TextBox(this, ["Hello there. You have a key I see, but I don't recognize you.", "May I ask what business you have with me?",
                ".....", "I beg your pardon - did you say a rocket?", "Oh, I don't doubt your handiwork. You have the look of a clever soul. But why build a rocket in the first place?",
                "*You reluctantly explain your goal*", "...Achelon.", ".........", "Most here won't admit it, but the ever-fading light leaves a cold shadow over our hearts, even up here.", "But to reach the Creator themself...",
                "I should call you mad. But I cannot.", "The light fades. The dusk stretches longer each night. Patience no longer holds virtue.", "You made your way all the way up here. Perhaps you can go further. Take this.","*You got a vial of dark red liquid!*", 
                "This...this is the blood of Achelon.", "We've been using it to keep some of the light around the village. I pray my judgement is not clouded too heavily by fear and impatience in giving this to you.",
                "It is a great energy source, but our supply runs low. This is what I can spare.", "I don't know if what you're doing is going to work.", "But perhaps it's better than doing nothing...",
                "Oh! And that blood is very corrosive towards living things. Please be careful!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                inventory.set("Rocket Fuel", "A potent energy source made from the blood of Achelon. Very corrosive and can melt any living thing it touches.");
                this.pastor_talked = true;
            } else if (this.pastor_talked) {
                this.textbox =  new TextBox(this, [".....", "May your path above be safe.", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }

        //Gate Logic
        if (this.physics.overlap(this.gate, head)) { 
            if (!inventory.has("Gate Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                this.textbox = new TextBox(this, ["Looks like the gate to the church is locked.", "I'll need a key...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            } else if (inventory.has("Gate Key") && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
                this.textbox = new TextBox(this, ["*You unlocked the gate*", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.worldLayer.putTileAtWorldXY(0, 768, 320);
                this.gate.body.destroy();
                inventory.delete("Gate Key");
            } 
        }
    }


    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 832;
        this.player.y = 608;
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