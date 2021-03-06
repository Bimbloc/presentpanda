/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class Star extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de Star
   * @param {Sceme} scene Escena en la que aparece la estrella
   * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
  constructor(scene, base, x, y) {
    super(scene, x,400, 'star').setInteractive();
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.y -= this.height;
    this.base = base;
  }

  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  create()
  {
   
  
   
   
   
    onEvent()
    {
     
    
    }
  }
 
  preUpdate() {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    super.preUpdate();
    /*if (this.scene.physics.overlap(this.scene.player, this)) {
        // Delegamos en la escena para decidir qué hacer al 
        // haber cogido una estrella
        if(diario.tetera)
       { this.scene.starPickt(this.base);
      
       }
    
        this.destroy();
    }*/
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    n= n.slice(0, 6);
    this.on('pointerdown',()=>{this.setTint('0x'+n);});
    this.on('pointerout', ()=>{ this.clearTint();});
   
    /*this.scene.time.addEvent(

      {
      delay:1000,
      callback: console.log("ssssssssssssss"),
      callbackScope: this
      }
      
      );*/
      
      
  }
}
