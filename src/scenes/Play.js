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


        this.space = this.physics.add.sprite(416, 224).setSize(128, 128);
        this.space.setScale(0.25);
        //this.space.setOrigin(0.5, 0.5);
        this.space.setOffset(64, 96);
        this.space.anims.play('space_press');


        this.textbox = new TextBox(this, ["test please find phyics body and press pace when facing it (arrow keys movement).", "another test", ""], 'text_box');
        this.textBoxes.add(this.textbox);
        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels).setZoom(2);
        this.cameras.main.setBounds(0, 0, map.widthInPixels + 640, map.heightInPixels + 640);

    }

        

    update() {
        this.textbox.update();
        this.player.update();
        this.char.update();
        this.move_nubs();
        this.key.update();
        this.box.update();
       /* if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log(inventory.get("key"));
        }*/
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }
        if (this.physics.overlap(this.balloon, head) && Phaser.Input.Keyboard.JustDown(cursors.space) && convo == false) {
            this.scene_switch();
        }
        if (this.physics.overlap(this.space, head) && convo == false) {
            this.space.setAlpha(1);
        }
        else {
            this.space.setAlpha(0);
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

    scene_switch() {
        //prev_scene = this;
        next_scene = this.scene.get('area_01Scene');
        //this.next_scene.place_inventory();
        this.scene.switch('area_01Scene');
        this.reconstruct_keybinds(next_scene);
    }

    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }
} 