module mummyGameTS.Client {

    export class Player extends Phaser.Sprite {
        cursors: any;
        level: Level01;
        game: Phaser.Game;

        constructor(game: Phaser.Game, level: Level01, x: number, y: number) {

            this.cursors = game.input.keyboard.createCursorKeys();
            this.level = level;
            this.game = game;
            super(game, x, y, 'char', 1);

            game.physics.arcade.enable(this);
            
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;

            this.animations.add('left', [8, 9, 10, 11], 10, true);
            this.animations.add('right', [8, 9, 10, 11], 10, true);

            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.setCircle(20);
            this.anchor.set(0.5);
        }

        update() {
            this.body.velocity.x = 0;
            var hitPlatforms = this.game.physics.arcade.collide(this, this.level.platforms);
            this.game.physics.arcade.overlap(this, this.level.stars, this.collectStar, null);

            if (this.cursors.left.isDown) {
                this.scale.set(-1, 1);
                this.body.velocity.x = -150;
                this.animations.play('left');
            } else if (this.cursors.right.isDown) {
                this.scale.set(1, 1);
                this.body.velocity.x = 150;
                this.animations.play('right');
            } else {
                this.animations.stop;
                this.frame = 4;
            }

            if (this.cursors.up.isDown && this.body.touching.down && hitPlatforms) {
                this.body.velocity.y = -300;
            }
        }

        collectStar(player, star) {
            star.kill();

            player.level.score += 10;
            player.level.scoreText.text = 'Score: ' + player.level.score;
        }

    }

}