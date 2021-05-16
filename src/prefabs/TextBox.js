class TextBox extends Phaser.GameObjects.Sprite {
    constructor(scene, text) {
        super(scene, game.config.width / 2, 520, 'text_box');
        scene.add.existing(this);
        this.eventCounter = 0;
        this.dialog;
        this.done = false;
        movement = false;
        convo = true;
        this.setText(text);
        }

    update() {
        if (convo == true && this.done == true && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            //console.log("destoyed");
            this.destroy();
            this.text.destroy();
            movement = true;
            convo = false;
            
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
    
        var x = 200;
        var y = 500;
    
        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
            fontFamily: 'font1',
            fontSize: '14px',
            color: '#6eeb34',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            wordWrap: { width: 300 }
            }
          });
    }

}