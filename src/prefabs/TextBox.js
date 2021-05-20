class TextBox extends Phaser.GameObjects.Sprite {
    constructor(scene, text) {
        super(scene, scene.cameras.main.midPoint.x, scene.cameras.main.midPoint.y + 29.5, 'text_box');
        scene.add.existing(this);
        this.eventCounter = 0;
        this.dialog;
        this.done = false;
        movement = false;
        convo = true;
        this.contents = text
        this.counter = 0;
        this.line = this.contents[this.counter]; 
        this.counter++;
        this.setText(this.line);
        this.line = this.contents[this.counter];
        }

    update() {
        if (convo == true && this.done == true && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            console.log("destoyed");
            //destory text
            this.text.destroy();
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
        this.scene.sound.play('bleep', { volume: 0.25 });
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if (this.eventCounter === this.dialog.length) {
            this.done = true;
            this.timedEvent.remove();
        }
    }
    
    // Calcuate the position of the text in the dialog window
    _setText (text) {
        // Reset the dialog
        if (this.text) this.text.destroy();
    
        var x = this.scene.cameras.main.midPoint.x - 145;
        var y = this.scene.cameras.main.midPoint.y ;
    
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
            fontFamily: 'font1',
            fontSize: '8px',
            color: '#0000000',
            align: 'left',
            wordWrap: { width: 280 }
            }
          });
    }

}