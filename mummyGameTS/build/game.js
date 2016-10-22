var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                _super.call(this, 1024, 680, Phaser.AUTO, 'content', null);
                this.state.add('Boot', Client.Boot, false);
                this.state.add('Preloader', Client.Preloader, false);
                this.state.add('MainMenu', Client.MainMenu, false);
                this.state.add('Level01', Client.Level01, false);
                this.state.start('Boot');
            }
            return GameEngine;
        })(Phaser.Game);
        Client.GameEngine = GameEngine;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
window.onload = function () {
    new mummyGameTS.Client.GameEngine();
};
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, level, x, y) {
                this.cursors = game.input.keyboard.createCursorKeys();
                this.level = level;
                this.game = game;
                _super.call(this, game, x, y, 'char', 1);
                game.physics.arcade.enable(this);
                this.body.bounce.y = 0.2;
                this.body.gravity.y = 300;
                this.body.collideWorldBounds = true;
                this.animations.add('left', [8, 9, 10, 11], 10, true);
                this.animations.add('right', [8, 9, 10, 11], 10, true);
                game.add.existing(this);
                game.physics.enable(this);
                this.body.collideWorldBounds = true;
                this.body.setCircle(20);
                this.anchor.set(0.5);
            }
            Player.prototype.update = function () {
                this.body.velocity.x = 0;
                var hitPlatforms = this.game.physics.arcade.collide(this, this.level.platforms);
                this.game.physics.arcade.overlap(this, this.level.stars, this.collectStar, null);
                if (this.cursors.left.isDown) {
                    this.scale.set(-1, 1);
                    this.body.velocity.x = -150;
                    this.animations.play('left');
                }
                else if (this.cursors.right.isDown) {
                    this.scale.set(1, 1);
                    this.body.velocity.x = 150;
                    this.animations.play('right');
                }
                else {
                    this.animations.stop;
                    this.frame = 4;
                }
                if (this.cursors.up.isDown && this.body.touching.down && hitPlatforms) {
                    this.body.velocity.y = -300;
                }
            };
            Player.prototype.collectStar = function (player, star) {
                star.kill();
                player.level.score += 10;
                player.level.scoreText.text = 'Score: ' + player.level.score;
            };
            return Player;
        })(Phaser.Sprite);
        Client.Player = Player;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0xFFFFFF);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                if (this.game.device.desktop) {
                    this.scale.pageAlignHorizontally = true;
                }
                else {
                    this.scale.minWidth = 480;
                    this.scale.minHeight = 260;
                    this.scale.maxWidth = 1024;
                    this.scale.maxHeight = 768;
                    this.scale.forceLandscape = true;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.refresh();
                }
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        })(Phaser.State);
        Client.Boot = Boot;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                _super.apply(this, arguments);
            }
            Level01.prototype.create = function () {
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
                var ledge = this.platforms.create(this.world.centerX - 300, this.world.centerY, 'barril');
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
                this.player = new Client.Player(this.game, this, this.world.centerX, this.world.centerY);
                this.game.debug.text("Use arrow keys to move around", 0, 15, "blue");
            };
            Level01.prototype.update = function () {
                this.game.physics.arcade.collide(this.stars, this.platforms);
            };
            return Level01;
        })(Phaser.State);
        Client.Level01 = Level01;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.apply(this, arguments);
            }
            MainMenu.prototype.create = function () {
                this.background = this.add.sprite(0, 0, 'titlepage');
                this.background.alpha = 0;
                this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
                this.logo.anchor.setTo(0.5);
                this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 500);
                this.game.debug.text("Click the logo to start the game", 0, this.world.height, "red");
                this.input.onDown.addOnce(this.fadeOut, this);
            };
            MainMenu.prototype.fadeOut = function () {
                this.add.audio('click', 1, false).play();
                this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startGame, this);
            };
            MainMenu.prototype.startGame = function () {
                this.game.state.start('Level01', true, false);
            };
            return MainMenu;
        })(Phaser.State);
        Client.MainMenu = MainMenu;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
var mummyGameTS;
(function (mummyGameTS) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", {
                    font: "18px Arial",
                    fill: "#A9A91111",
                    align: "center"
                });
                this.loaderText.anchor.setTo(0.5);
                this.load.image('titlepage', './assets/ui/titlePage.png');
                this.load.image('logo', './assets/ui/gameLogo.png');
                this.load.image('barril', './assets/sprites/drop.png');
                this.load.spritesheet('char', 'assets/sprites/esquilo.png', 53, 57, 12);
                this.load.audio('click', './assets/sounds/click.ogg', true);
                this.load.atlasJSONHash('level01-sprites', './assets/sprites/level01-sprites.png', './assets/sprites/level01-sprites.json');
            };
            Preloader.prototype.create = function () {
                var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start('MainMenu', true, false);
            };
            return Preloader;
        })(Phaser.State);
        Client.Preloader = Preloader;
    })(Client = mummyGameTS.Client || (mummyGameTS.Client = {}));
})(mummyGameTS || (mummyGameTS = {}));
//# sourceMappingURL=game.js.map