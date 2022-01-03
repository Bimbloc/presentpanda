import Star from './star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y,f) {
    super(scene, x, y, 'racsheet',[0]);
    this.score = 0;
    this.ammo=10;
    this.f=f;
    this.shooting=false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(2, 30, "").setDepth(2).setScrollFactor(0);
    this.label2 = this.scene.add.text(8, 80, "").setDepth(2).setScrollFactor(0);
    this.scene.add.sprite(140,40,'ui').setDepth(1).setScrollFactor(0);
    
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.a = this.scene.input.keyboard.addKey('A');
    this.d = this.scene.input.keyboard.addKey('D');
    this.w = this.scene.input.keyboard.addKey('W');
    this.s = this.scene.input.keyboard.addKey('S');
    this.a.on('down',()=>{ this.body.setVelocityX(-this.speed);});
    this.anims.create({
      key: 'playerwalk',
      frames: this.anims.generateFrameNumbers('racsheet', {
        start: 3,
        end: 5
      }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'playerstand',
      frames: this.anims.generateFrameNumbers('racsheet', {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });
    this.shoow=this.anims.create({
      key: 'playershoot',
      frames: this.anims.generateFrameNumbers('racsheet', {
        start: 6,
        end: 8
      }),
      frameRate: 5,
      repeat: 0
    });
    this.play('playerstand',true);
    this.updateScore();
    this.updateAmmo();

  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
    
  }
  shoot()
  {
    this.shooting=true;
    this.anims.stop();
  this.play('playershoot');
  this.on('animationcomplete',()=>{ this.shooting=false});
  //this.onComplete(()=>{this.shooting=false});
  this.ammo--;
  this.updateAmmo();
  
 
  }
  stack(am)
  {
    if(this.ammo<15)
    {this.ammo+=am;}
    this.updateAmmo();
  }
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Gifts Delivered:' + this.score;
  }
  updateAmmo()
  {
    this.label2.text = 'Ammo: ' + this.ammo;

  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if ((this.cursors.up.isDown ||this.w.isDown)&& this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
      else  if (this.cursors.left.isDown||this.a.isDown) {
      this.body.setVelocityX(-this.speed);
      this.setFlipX(true);
      }
       else if (this.cursors.right.isDown||this.d.isDown) {
      this.body.setVelocityX(this.speed);
      this.setFlipX(false);
      }
       else if(this.cursors.down.isDown ||this.s.isDown)
        {
        this.body.setVelocityY(-this.jumpSpeed);

        }
    else if(!this.cursors.left.isDown&&!this.a.isDown) {
      this.body.setVelocityX(0);
      
    }
    if (this.body.speed > 0&&!this.shooting) {this.play('playerwalk', true); this.f.play() }
    else if(!this.shooting) {this.play('playerstand', true);this.f.stop(); }  
  }
  
}
