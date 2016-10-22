module mummyGameTS.Client {

    export class Level01 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Player;
        platforms: any;
        stars: any;
        scoreText: Phaser.Text;
        score: number;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'level01-sprites', 'background');

            var style = { fontSize: '32px', fill: '#000' };
            this.scoreText = this.game.add.text(10, 15, 'Score: 0', style);
            this.score = 0;

            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;

            var ground = this.platforms.create(this.world.centerX, this.game.world.height - 30, 'barril');

            ground.scale.setTo(32, 2);
            ground.body.immovable = true;
            ground.anchor.set(0.5);

            var ledge = this.platforms.create(this.world.centerX + 300, this.world.centerY + 150, 'barril');
            ledge.body.immovable = true;
            ledge.scale.setTo(15, 1);
            ledge.anchor.set(0.5);

            var ledge = this.platforms.create(this.world.centerX - 300, this.world.centerY , 'barril');
            ledge.body.immovable = true;
            ledge.scale.setTo(15, 1);
            ledge.anchor.set(0.5);

            this.stars = this.game.add.group();
            this.stars.enableBody = true;

            for (var i = 0; i < 12; i++) {
                var star = this.stars.create(i * 70, 0, 'barril');
                star.body.gravity.y = 40;
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }

            this.player = new Player(this.game, this, this.world.centerX, this.world.centerY);          

            this.game.debug.text("Use arrow keys to move around", 0, 15, "blue");
        }

        update() {
            this.game.physics.arcade.collide(this.stars, this.platforms);
        }

    }

}