class TextBox extends Phaser.GameObjects.Sprite {
    constructor(scene, text) {
        super(scene, scene.cameras.main.midPoint.x, scene.cameras.main.midPoint.y + 137, 'text_box');
        scene.add.existing(this);
        this.eventCounter = 0;
        this.dialog;
        this.done = false;
        movement = false;
        convo = true;
        this.contents = text;
        this.counter = 0;
        this.line = this.contents[this.counter]; 
        this.counter++;
        this.setText(this.line);
        this.line = this.contents[this.counter];


        this.spaceConfig = {
            fontFamily: 'font1',
            fontSize: '72px',
            color: '#0000000',
            align: 'left',
            lineSpacing: 100,
            wordWrap: { width: 3600 }

        }
    }

    update() {
        if (convo == true && this.done == true && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            //destory text
            this.text.destroy();
            this.prompt.destroy();
            this.done = false;
            if (this.line == "") {
                this.destroy();
                //set params to default values
                movement = true;
                convo = false;
                this.counter = 0;
            } else {
                this.line = this.contents[this.counter]; 
                this.counter++;
                this.setText(this.line);
                this.line = this.contents[this.counter];
            }
        }
    }

    //Below method inspired from: https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/


    // Sets the text for the dialog window
    setText(text) {
        this.eventCounter = 0;
        this.dialog = text.split('');
        if (this.timedEvent) this.timedEvent.remove();

        var tempText = "";
        this._setText(tempText);

        this.timedEvent = this.scene.time.addEvent({
            delay: 150 - (dialogSpeed * 30),
            callback: this._animateText,
            callbackScope: this,
            loop: true
          });
    }

    // Slowly displays the text in the window to make it appear animated
    _animateText() {
        this.eventCounter++;
        this.scene.sound.play('bleep', { volume: 0.05, rate: 2.0, detune: -1200});
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.done = true;
            this.prompt = this.scene.add.text(this.scene.cameras.main.midPoint.x + 80, this.scene.cameras.main.midPoint.y + 165, '[Space]', this.spaceConfig).setScale(0.2);
            this.timedEvent.remove();
        }
    }
    
    // Calcuate the position of the text in the dialog window
    _setText (text) {
        // Reset the dialog
        if (this.text) this.text.destroy();
    
        var x = this.scene.cameras.main.midPoint.x - 185;
        var y = this.scene.cameras.main.midPoint.y + 95;
    
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
            fontFamily: 'font1',
            fontSize: '72px',
            color: '#0000000',
            align: 'left',
            lineSpacing: 100,
            wordWrap: { width: 3600 }
            }
          }).setScale(0.1);
    }

}