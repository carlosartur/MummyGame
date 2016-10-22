module mummyGameTS.Client {

    export class Movement{
        object: any;
        game: Phaser.Game;
        arows: any;
        
        constructor(game: Phaser.Game, object: any, type: string) {
            this.object = object;
            this.game = game;
            this.setMovementType(type);
        }

        move(hitPlatform: boolean)
        {
            if (this.arows.left.isDown) {
                this.moveLeft();
            } else if (this.arows.right.isDown) {
                this.moveRight();
            } else {
                this.object.animations.stop;
                this.object.frame = this.object.stoppedFrame;
            }

            if (this.arows.up.isDown && this.object.body.touching.down && hitPlatform) {
                this.jump();
            }
        }

        moveLeft()
        {
            this.object.scale.set(-1, 1);
            this.object.body.velocity.x = - this.object.movementSpeed;
            this.object.animations.play('left');
        }

        moveRight()
        {
            this.object.scale.set(1, 1);
            this.object.body.velocity.x = this.object.movementSpeed;
            this.object.animations.play('right');
        }

        jump()
        {
            this.object.body.velocity.y = -300;
        }

        setMovementType(type: string) {
            if (type == 'wasd') {
                this.arows = this.game.input.keyboard.addKeys({
                    'up': Phaser.KeyCode.W,
                    'down': Phaser.KeyCode.S,
                    'left': Phaser.KeyCode.A,
                    'right': Phaser.KeyCode.D
                });

                // Para previnir o CTRL+W do browser
                this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.W);

            } else if (type == 'arows') {
                this.arows = this.game.input.keyboard.createCursorKeys();
            }
        }
    }

}