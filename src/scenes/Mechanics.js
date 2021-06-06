class Mechanics extends Phaser.Scene {
    constructor() {
        super("mechanicScene");
    }

    preload(){
        this.load.image("tiles_02", "./assets/img/tileset_rusty.png");
        this.load.tilemapTiledJSON("mechanics", "./assets/config/mechanic.json" );
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        keyCTRL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.textBoxes = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.construct_player();

        this.mechanic = new Mechanic(this);

        //create map
        this.mechanics = this.make.tilemap({key: "mechanics"});
        this.tilesetmechanics = this.mechanics.addTilesetImage("tileset_rusty", "tiles_02");
        //establishing layers
        this.frontLayermechanics = this.mechanics.createLayer("front", this.tilesetmechanics, 0, 0);
        this.frontLayermechanics.setDepth(0);
        this.worldLayermechanics = this.mechanics.createLayer("world", this.tilesetmechanics, 0, 0);
        this.worldLayermechanics.setDepth(-2);
        this.groundLayermechanics = this.mechanics.createLayer("ground", this.tilesetmechanics, 0, 0);
        this.groundLayermechanics.setDepth(-3);
        //add collision
        this.worldLayermechanics.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.worldLayermechanics);

        //debug collision
        this.debugGraphics = this.add.graphics().setAlpha(0.5);
        this.worldLayermechanics.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.outside_door = this.physics.add.sprite(224, 432).setSize(32, 16);
        this.outside_door.setOrigin(1, 1);
        
        this.cameras.main.setViewport(0, 0, 800, 800).setZoom(2);
        this.cameras.main.setBounds(0, 0, this.mechanics.widthInPixels, this.mechanics.heightInPixels);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.player);

        this.physics.world.setBounds(0, 0, this.mechanics.widthInPixels, this.mechanics.heightInPixels)
    }

    update() {
        this.player.update();
        this.move_nubs();
        this.mechanic.update();

        //menu logic
        if (convo == false && Phaser.Input.Keyboard.JustDown(keyCTRL)) {
            this.menu_activation();
        }

        //Outside Door logic
        if (this.physics.overlap(this.outside_door, head)  && convo == false) {
            this.scene_switch(this.scene.get('area_01Scene'));
        }
    }

    //constructs the player and 4 directional nubs for collision detection.
    construct_player() {
        this.player = new Player(this);
        this.player.x = 208;
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