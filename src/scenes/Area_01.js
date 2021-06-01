class Area_01 extends Phaser.Scene {
    constructor() {
        super("area_01Scene");
    }

    preload(){
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("area_01", "./assets/config/area_01.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
        

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        
        

        this.construct_player();

        
        
        

       
        
        this.balloon = this.physics.add.sprite(96, 360);
        this.balloon.anims.play('balloon_sway');

        this.char = new Char(this);
        this.physics.add.collider(this.char, this.player);
        this.char.setDepth(-1);

        this.key = new Key(this);

        this.box = new Box(this);

        //create map
        const map01 = this.make.tilemap({key: "area_01"});
        const tileset01 = map01.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        const frontLayer01 = map01.createLayer("front", tileset01, 0, 0);
        frontLayer01.setDepth(0);
        const worldLayer01 = map01.createLayer("world", tileset01, 0, 0);
        worldLayer01.setDepth(-2);
        const groundLayer01 = map01.createLayer("ground", tileset01, 0, 0);
        groundLayer01.setDepth(-3);
        //add collision
        worldLayer01.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, worldLayer01);
        this.physics.add.collider(this.box, worldLayer01); // please remove scene does not have box
        //debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.5);
        worldLayer01.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, map01.widthInPixels, map01.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.textbox = new TextBox(this, ["Made it to 2nd area", "anotherrrr test", ""], 'text_box');
        this.textBoxes.add(this.textbox);
    }

        

    update() {
        this.textbox.update();
        this.player.update();
        this.char.update();
        this.move_nubs();
        this.key.update();
        this.box.update();
        if (convo == false && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log(inventory.get("key"));
        }
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
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

    reconstruct_keybinds(scene) {
        cursors = scene.input.keyboard.createCursorKeys();
        keyCTRL = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }
} 