export default class Ammopile extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y)
    { super(scene,x,y,'ammo')
    this.player=player;
    this.scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.anims.create
    ({

        key: 'pilestand',
        frames: this.anims.generateFrameNumbers('psheet', {
          start: 0,
          end: 2
        }),
        frameRate: 3,
        repeat: -1
    });
    this.play("pilestand",true);

    }

}