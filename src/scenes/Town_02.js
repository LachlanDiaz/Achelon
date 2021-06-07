class Town02 extends Phaser.Scene {
    constructor() {
        super("town02Scene");
    }

    preload(){
        this.load.image("tiles", "./assets/img/tileset_clean.png");
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
        this.tileset = this.map.addTilesetImage("tileset_clean", "tiles");
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
            this.textbox = new TextBox(this, ["*You knock on the door...*", "Doesn't seem to be anyone home...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_top_right, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "They might be out...", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }
        if (this.physics.overlap(this.door_bot_right, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            this.textbox = new TextBox(this, ["*You knock on the door...*", "They might be out...", ""], 'text_box');
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
            this.textbox = new TextBox(this, ["Viridian Church", "May our Creator's light forever shine!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
        }

        //NPC dialouge stuff 
        if (this.physics.overlap(this.npc_02, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_02_talked) {
                this.textbox = new TextBox(this, ["Can you step away from me please. You look filthy", "Goodness I don't know why we keep letting in people from the lower levels!",
                "Do they want our peaceful town to end up like theirs...",""], 'text_box');
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
                this.textbox = new TextBox(this, ["Hi!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.npc_03_talked = true;
            } else if (this.npc_03_talked) {
                this.textbox =  new TextBox(this, ["Hmm?", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.npc_04, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.npc_04_talked) {
                this.textbox = new TextBox(this, ["Hello!", "Hmmm you're looking for fuel for your rocket?",
                "Well we might have something you could use for fuel at the church over there.", "Here's the gate key.",
                "*You got the church gate key!*", "Good luck with your rocket", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                inventory.set("Gate Key", "Use to unlock the gate to the church");
                this.npc_04_talked = true;
            } else if (this.npc_04_talked) {
                this.textbox =  new TextBox(this, ["A rocket huh...", "Could it be you're going to try and reach Achelon...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.pastor, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.pastor_talked) {
                this.textbox = new TextBox(this, ["Hmmm fuel for a rocket...",
                "We do have something that might be of use for that sort of thing.", "But first you must tell me why you're building this rocket in the first place.",
                "Depending on your answer I'll decide whether or not it's wise to give you what you're asking for.", "*You reluctantly explain your goal*", 
                "You're trying to reach Achelon?!", "Well I can't say that I think it's possible. But I admire your determination...", "...", "Fine...",
                "Take this.", "*You got a vial of dark red liquid!*", "That there is blood from Achelon.", "We've been using it to keep some of the light around the village.",
                "But we're running low.", "Honestly I don't know if what you're doing is going to work.", " But it's better than doing nothing...",
                "Oh! And that blood is very corrosive. So be careful!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                inventory.set("Rocket Fuel", "Made from the blood of Achelon. very corrosive and can melt anything it touches.");
                this.pastor_talked = true;
            } else if (this.pastor_talked) {
                this.textbox =  new TextBox(this, ["Good Luck...", ""], 'text_box');
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