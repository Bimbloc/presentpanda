import Player from './player.js';
import Platform from './platform.js';
import Portal from './portal.js';
import Present from './present.js';
import Ammopile from './ammopile.js';
//import Game from './game.js';
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  preLoad()
  {
    //this.load.tilemapTiledJSON('tilemap', '../assets/mapa.json');
   // this.load.image('mp', '../assets/mp.png');

    //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

   


  }
  create() {
   // game = new Game();
  // this.game= new Game()
   /*this.map = this.make.tilemap({ 
    key: 'tilemap', 
    tileWidth: 32, 
    tileHeight: 32 
  });
  const tileset1 = this.map.addTilesetImage('tilemap', 'mp');
  this.backgroundLayer = 
  this.map.createLayer('Capa de patrones 1', 
                             [tileset1]);
   this.backgroundLayer.resizeWorld();*/
   this.game.sound.stopAll();
   this.musica = this.sound.add('mainmusic', 
   {volume: this.game.sound.volume * 0.5, loop: true});
   this.musica.play();
   this.f=this.sound.add('racsteps', 
   {volume: this.game.sound.volume * 0.5, loop: true});
    this.stars = 10;
    this.bases = this.add.group();
    this.portals=this.add.group();
    
    this.player = new Player(this, 180, 500,this.f);
    this.add.sprite(1000,200,'background').setDepth(-2);
    this.add.sprite(700,140,'bacground').setDepth(-1).setScrollFactor(1.1,1);
    this.anims.create
        ({

            key: 'fall',
            frames: this.anims.generateFrameNumbers('snow', {
              start: 0,
              end: 9
            }),
            frameRate:6,
            repeat: -1
        });
    this.add.sprite(500,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(1500,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(2000,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(700,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(200,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(1200,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(70,300,'snow').setDepth(1).play("fall",true);
    this.add.sprite(500,630,'floor');
    this.totaltime= 7200//en seegundos 2 minutitos
    this.label=this.add.text(200, 30, "").setDepth(2).setScrollFactor(0);
    this.tictac();
    this.totaltimer=this.time.addEvent(
    {
      delay : 10,
      callback:this.tictac,
      callbackScope:this,
      loop:true

    }


    );

    this.montona= new Ammopile(this,this.player,10,400);
    this.add.existing(this.montona);
    this.montonb= new Ammopile(this,this.player,1900,400);
    this.add.existing(this.montonb);
    this.physics.add.overlap(this.montona,this.player,()=> this.player.stack(1));
    this.physics.add.overlap(this.montonb,this.player,()=> this.player.stack(1));
    //this.game.game.camera.follow(player);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 100);
    //this.cameras.main.setViewport(100,100,100,50);
    this.physics.world.setBounds( 0, 0, 2000, 500 );
     this.deertime=0;
   this.deertimer=this.time.addEvent(
      {
        delay:this.deertime,
        callback:this.spawn,
        callbackScope:this,
        loop: 10
      }
    );
    //this.time.addEvent(200, 10, this.spawn(), this,true);
    
    //GENEREMOS LOS RENOS
    this.spawn();
    this.physics.add.collider(this.portals, this.player,collisionPortal);
    function collisionPortal(obj1,obj2)
    {
    obj1.choco(obj2);
    

    }
 

    this.q= this.input.keyboard.addKey('Q');
    this.q.on('down',()=>{this.portals.children.iterate(item=>{
      item.x+=20;
     
    //console.log("uhkl");
    })});
    this.game.input.mouse.capture = true;
  window.addEventListener("click",()=>{ //console.log("click"+ this.input.activePointer.x+"X"+this.input.activePointer.y);
if(this.player.ammo>0)
 { this.present= new Present(this,this.player,this.input.activePointer.worldX,this.input.activePointer.worldY,this.portals)
this.add.existing(this.present);

 }

});
 
   
  
}
  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn() {
    let ry=0;
    let rx=0;
    let speedy =0;
    let lifetime=0;
    lifetime=Phaser.Math.Between(1000, 2000);
    rx=Phaser.Math.Between(200, 1400);
    ry=Phaser.Math.Between(100, 165);
    speedy=Phaser.Math.Between(100, 200);
    this.deertimer.delay=Phaser.Math.Between(900, 3000);
    //console.log("aaa");
    this.p=new Portal(this,this.player,this.portals,rx,ry,speedy,lifetime);
    
  }
 tictac()
 {
   this.totaltime--;
   if(Math.floor(this.totaltime%3600/60)>9)
   this.label.text= "TIME:" +Math.floor(this.totaltime/3600) +":"+Math.floor(this.totaltime%3600/60);
   else
   this.label.text= "TIME:" +Math.floor(this.totaltime/3600) +":0"+Math.floor(this.totaltime%3600/60);
   if(this.totaltime<1)
    
   this.scene.start('scoreboard',{id: 0,number:this.player.score});
 }
  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }
}