module mummyGameTS.Client {

    export class Movement{
        object: any;
        arows: any;
        
        constructor(game: Phaser.Game, object: any) {
            this.object = object;
            this.arows = game.input.keyboard.createCursorKeys();
        }

        arowsMove(hitPlatform: boolean)
        {
            console.log(this.object);

            if (this.arows.left.isDown) {
                this.moveLeft();
            } else if (this.arows.right.isDown) {
                this.moveRight();
            } else {
                this.object.animations.stop;
                this.object.frame = this.object.stoppedFrame;
            }

            if (this.arows.up.isDown && this.object.body.touching.down && hitPlatform) {
                this.object.body.velocity.y = -300;
            }
        }

        moveLeft() {
            this.object.scale.set(-1, 1);
            this.object.body.velocity.x = - this.object.movementSpeed;
            this.object.animations.play('left');
        }

        moveRight() {
            this.object.scale.set(1, 1);
            this.object.body.velocity.x = this.object.movementSpeed;
            this.object.animations.play('right');
        }

    }

}