export default class ScoreBoard extends Phaser.Scene {

    constructor() {
        super({ key: 'scoreboard' });
       
      }
      init(data)
      {
          console.log('init', data);
          this.s=data.number;
      }
    create()
    {   this.game.sound.stopAll();
        this.musica = this.sound.add('mainumusic', 
        {volume: this.game.sound.volume * 0.5, loop: true});
        this.musica.play();
        this.add.sprite(1000,300,'background').setDepth(-2);
        this.add.sprite(500,300,'screen');
        this.label = this.add.text(260, 320, "You delivered:"+this.s+" presents").setFontSize(32);
        this.label2 = this.add.text(360, 150, "TIMES'S UP!").setFontSize(40);
        this.add.sprite(700,300,'snow').setDepth(1).play("fall",true);
        this.add.sprite(200,300,'snow').setDepth(1).play("fall",true);
      


    }
}