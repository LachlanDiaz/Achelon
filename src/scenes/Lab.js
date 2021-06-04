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
        
        

        this.construct_player();

        this.bolt_cutters = this.physics.add.sprite(96, 352).setSize(32,32);
        this.bolt_cutters.setOrigin(1, 1);
        this.bolt_cutters.body.allowGravity = false;
        this.bolt_cutters.body.immovable = true;
        this.bolt_cutters.anims.play("item_shine");
        this.bolt_cutters_dead = false;

        this.box = new Box(this);
        this.box.x = 224;
        this.box.y = 352;

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
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 400;
        this.player.y = 400;
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