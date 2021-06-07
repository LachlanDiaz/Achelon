class Lab extends Phaser.Scene {
    constructor() {
        super("labScene");
    }

    preload(){
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("lab", "./assets/config/lab.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        this.bolt_cutters = this.physics.add.sprite(96, 352).setSize(32,32);
        this.bolt_cutters.setOrigin(1, 1);
        this.bolt_cutters.body.allowGravity = false;
        this.bolt_cutters.body.immovable = true;
        this.bolt_cutters.anims.play("item_shine");
        this.bolt_cutters_dead = false;


        this.npc_01 = this.physics.add.sprite(256, 192, 'testing').setSize(32,32);
        this.npc_01.setOrigin(1, 1);
        this.npc_01.body.allowGravity = false;
        this.npc_01.body.immovable = true;
        this.npc_01_talked = false;

        this.npc_02 = this.physics.add.sprite(288, 192, 'testing').setSize(32,32);
        this.npc_02.setOrigin(1, 1);
        this.npc_02.body.allowGravity = false;
        this.npc_02.body.immovable = true;
        this.npc_02_talked = false;

        this.npc_03 = this.physics.add.sprite(320, 192, 'testing').setSize(32,32);
        this.npc_03.setOrigin(1, 1);
        this.npc_03.body.allowGravity = false;
        this.npc_03.body.immovable = true;
        this.npc_03_talked = false;

        this.npc_04 = this.physics.add.sprite(352, 192, 'testing').setSize(32,32);
        this.npc_04.setOrigin(1, 1);
        this.npc_04.body.allowGravity = false;
        this.npc_04.body.immovable = true;
        this.npc_04_talked = false;

        this.town_head = this.physics.add.sprite(384, 192, 'testing').setSize(32,32);
        this.town_head.setOrigin(1, 1);
        this.town_head.body.allowGravity = false;
        this.town_head.body.immovable = true;
        this.town_head_talked = false;

        this.construct_player();
        this.physics.add.collider(this.npc_01, this.player);
        this.physics.add.collider(this.npc_02, this.player);
        this.physics.add.collider(this.npc_03, this.player);
        this.physics.add.collider(this.npc_04, this.player);
        this.physics.add.collider(this.town_head, this.player);

        this.box = new Box(this);
        this.box.x = 224;
        this.box.y = 352;
        this.box.setDepth(-1);

        //create map
        const lab = this.make.tilemap({key: "lab"});
        const tilesetlab = lab.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        const frontLayerlab = lab.createLayer("front", tilesetlab, 0, 0);
        frontLayerlab.setDepth(0);
        const worldLayerlab = lab.createLayer("world", tilesetlab, 0, 0);
        worldLayerlab.setDepth(-2);
        const groundLayerlab = lab.createLayer("ground", tilesetlab, 0, 0);
        groundLayerlab.setDepth(-3);
        //add collision
        worldLayerlab.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, worldLayerlab);
        this.physics.add.collider(this.box, worldLayerlab); // please remove scene does not have box
        //debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.5);
        worldLayerlab.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.lab_door = this.physics.add.sprite(704, 430).setSize(32, 16);
        this.lab_door.setOrigin(1, 1);
        
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, lab.widthInPixels, lab.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.physics.world.setBounds(0, 0, lab.widthInPixels, lab.heightInPixels)
    }

        

    update() {
        this.player.update();
        this.move_nubs();
        this.box.update();

        //menu logic
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //Getting bolt_cutters logic
        if (this.physics.overlap(this.bolt_cutters, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            console.log("get bolt cutters");
            this.textbox = new TextBox(this, ["You found a pair of bolt cutters!", ""], 'text_box');
            this.textBoxes.add(this.textbox);
            inventory.set("Bolt Cutters", "Some Bolt Cutters, maybe you can use them on some loose fencing...");
        }

        if (inventory.has("Bolt Cutters") && convo == false && !this.bolt_cutters_dead) {
            this.bolt_cutters.body.destroy();
            this.bolt_cutters_dead = true;
            this.bolt_cutters.alpha = 0;
        }

        //Lab Door logic
        if (this.physics.overlap(this.lab_door, head)  && convo == false) {
            this.scene_switch(this.scene.get('playScene'));
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
                "Well we might have something you could use for fuel at the church over there.", "Here's the gate key",
                "*You got the church gate key!*", "Good luck with your rocket", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.npc_04_talked = true;
            } else if (this.npc_04_talked) {
                this.textbox =  new TextBox(this, ["A rocket huh...", "Could it be you're going to try and reach Achelon...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
        if (this.physics.overlap(this.town_head, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            convo = true;
            if (!this.town_head_talked) {
                this.textbox = new TextBox(this, ["Hmmm fuel for a rocket...",
                "We do have something that might be of use for that sort of thing.", "But first you must tell me why you're building this rocket in the first place.",
                "Depending on your answer I'll decide whether or not it's wise to give you what you're asking for.", "*You reluctantly explain your goal*", 
                "You're trying to reach Achelon?!", "Well I can't say that I think it's possible. But I admire your determination...", "...", "Fine...",
                "Take this.", "*You got a vial of dark red liquid!*", "That there is blood from Achelon.", "We've been using it to keep some of the light around the village.",
                "But we're running low.", "Honestly I don't know if what you're doing is going to work.", " But it's better than doing nothing...",
                "Oh! And that blood is very corrosive. So be careful!", ""], 'text_box');
                this.textBoxes.add(this.textbox);
                this.town_head_talked = true;
            } else if (this.town_head_talked) {
                this.textbox =  new TextBox(this, ["Good Luck...", ""], 'text_box');
                this.textBoxes.add(this.textbox);
            }
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 672;
        this.player.y = 384;
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