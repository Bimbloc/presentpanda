
export default class Present extends Phaser.GameObjects.Sprite {

    constructor(scene, player, mx, my,deergroup)
    {
        let offset= 40;
        let gofast=360;
        let nx;
        if(mx>player.x)
        { nx=player.x+offset;}
        else
       {  nx=player.x-offset;}
        let y=player.y+offset;
      
    super(scene,nx,y,'present')
     player.shoot();
    this.speed={vx:30,vy:30};
    let vx = mx-player.x;
    let vy=my-player.y;
    this.velocity=new Phaser.Math.Vector2(vx, vy)
    this.velocity.normalize();
    this.velocity.x= this.velocity.x*gofast;
    this.velocity.y= this.velocity.y*gofast;
this.scene.physics.add.existing(this);

this.scene.physics.add.collider(deergroup, this,collisionReno);
function collisionReno(obj1,obj2)
    {
    obj1.choco(obj2);
    

    }
//this.body.setVelocity(2,2);
this.body.setVelocityX(2);
this.body.setVelocityY(2);


    }
   preUpdate(t,dt)
    {
        super.preUpdate(t,dt)
       // this.body.setVelocityX(20);
        
        //this.body.setVelocityY(20);
        this.body.setVelocity(this.velocity.x,this.velocity.y);
        if(this.y<0)
        {
        this.destroy();

        }
    }

}