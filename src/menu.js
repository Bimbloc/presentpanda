export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'menu' });
       
      }
     
    create()
    {
        this.musica = this.sound.add('menumusic', 
        {volume: this.game.sound.volume * 0.5, loop: true});
        this.musica.play();
        this.add.sprite(1000,300,'background').setDepth(-2);
        this.add.sprite(500,400,'screen');
        this.add.sprite(520,100,'title');
        this.label = this.add.text(290, 420, "A Game by Rocio Sanchez").setFontSize(28);
        this.label2 = this.add.text(450, 260, "PLAY").setFontSize(40).setDepth(1);
        this.p=this.add.sprite(490,280,'play').setInteractive().setDepth(0);
        this.p.on('pointerover',()=>{this.p.setTint('0x808080')})
        this.p.on('pointerout',()=>{this.p.clearTint();})

        this.p.on('pointerdown',()=>{this.scene.start('level')});
        this.add.sprite(700,300,'snow').setDepth(1).play("fall",true);
        this.add.sprite(200,300,'snow').setDepth(1).play("fall",true);
      


    }
}