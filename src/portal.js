export default class Portal extends Phaser.GameObjects.Sprite {

    constructor(scene, player, portalGroup, x, y,speedy,lifetime)
    {
        super(scene,x,y,'drsheet',[1])
        this.limitx=280;
        this.startx=x;
        this.speed=speedy;
        this.fliped=false;
        this.timef=lifetime;
        this.scene.add.existing(this);
        
      this.anims.create
        ({

            key: 'deerstand',
            frames: this.anims.generateFrameNumbers('drsheet', {
              start: 0,
              end: 1
            }),
            frameRate: 5,
            repeat: -1
        });
         this.play("deerstand",true);
         
          this.scene.physics.add.existing(this);
          this.body.setAllowGravity(false)
          portalGroup.add(this);
          this.deertimer=this.scene.time.addEvent(
            {
              delay : 10,
              callback:this.tictac,
              callbackScope:this,
              loop:true
        
            }
        
        
            );
          }

    update()
    {
        super.update();
    }
    preUpdate(t,dt)
    { 
        
    super.preUpdate(t,dt);
    this.body.setVelocityY(0);
    if(this.x>this.startx+this.limitx)
    {
       this.speed=-this.speed;
       this.flipped=!this.fliped;
       this.setFlipX(this.fliped);
    }
    else if(this.x<this.startx)
    {
        this.speed=-this.speed;
        this.flipped=!this.fliped;
        this.setFlipX(true);
    }
    this.body.setVelocityX(this.speed);
   
    }

  choco(obj)
  {
      //console.log("a");
     // obj.setPosition(0,500);
    obj.scene.player.point();
    obj.destroy();
    this.destroy();
  }
  tictac()
  {
    this.timef-=4;
    if(this.timef<250)
   {//console.log("deadeer");
    this.alpha=this.alpha-0.01;
    if(this.timef<4)
    this.destroy();
   }

  }

}