module mummyGameTS.Client {

    export class Player extends Phaser.Sprite {
        cursors: any;
        level: Level01;
        game: Phaser.Game;
        movement: Movement;
        movementSpeed: number;
        stoppedFrame: number;

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
            this.stoppedFrame = 4;

            game.add.existing(this);
            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.setCircle(20);
            this.anchor.set(0.5);

            this.movementSpeed = 100;
            this.movement = new Movement(game, this);
        }

        update() {
            this.body.velocity.x = 0;
            var hitPlatforms = this.game.physics.arcade.collide(this, this.level.platforms);

            this.movement.arowsMove(hitPlatforms);
            this.game.physics.arcade.overlap(this, this.level.stars, this.collectStar, null);
        }

        collectStar(player, star) {
            star.kill();

            player.level.score += 10;
            player.level.scoreText.text = 'Score: ' + player.level.score;
        }

    }

}