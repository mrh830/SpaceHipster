SpaceHipster.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already
    // exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from
                    // it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world"
    // or you'll over-write the world reference.

};

SpaceHipster.Game.prototype = {

    create: function () {

        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        this.player.scale.setTo(2);
        this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
        this.player.animations.play('fly');

        this.game.camera.follow(this.player);

        this.score = 0;

        this.game.physics.arcade.enable(this.player);
        this.playerSpeed = 120;
        this.player.body.collideWorldBounds = true;

        this.explosionSound = this.game.add.audio('explosion');
        this.collectSound = this.game.add.audio('collect');

        this.generateCollectibles();
        this.generateAsteroids();

        this.showLabels();
    },

    update: function () {

        if (this.game.input.activePointer.justPressed()) {
            this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
        }

        this.game.physics.arcade.overlap(this.player, this.collectibles, this.collect, null, this);

        this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

    },

    collect: function (player, collectible) {
        this.collectSound.play();

        this.score++;

        this.scoreLabel.text = this.score;

        collectible.destroy();
    },

    hitAsteroid: function (player, asteroid) {
        //this.explosionSound.play();

        var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
        emitter.makeParticles('playerParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 100);

        this.player.kill();

        this.game.time.events.add(800, this.quitGame, this);
    },

    generateCollectibles: function () {
        this.collectibles = this.game.add.group();

        this.collectibles.enableBody = true;
        this.collectibles.physicsBodyType = Phaser.Physics.ARCADE;

        var numCollectibles = this.game.rnd.integerInRange(10, 15);
        var collectible;

        for (var i = 0; i < numCollectibles; i++) {
            collectible = this.collectibles.create(this.game.world.randomX, this.game.world.randomY, 'power');
            collectible.animations.add('fly', [0, 1, 2, 3], 5, true);
            collectible.animations.play('fly');
        }
    },

    generateAsteroids: function () {
        this.asteroids = this.game.add.group();

        this.asteroids.enableBody = true;
        this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

        var numAsteroids = this.game.rnd.integerInRange(15, 20);
        var asteroid;

        for (var i = 0; i < numAsteroids; i++) {
            asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
            asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);

            asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
            asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
            asteroid.body.immovable = true;
            asteroid.body.collideWorldBounds = true;
        }
    },

    showLabels: function () {
        var text = "0";
        var style = {font: "20px Arial", fill: "#fff", align: "center"};
        this.scoreLabel = this.game.add.text(this.game.width - 50, this.game.height - 50, text, style);
        this.scoreLabel.fixedToCamera = true;
    },

    quitGame: function () {
        this.state.start('MainMenu', true, false, this.score);

    }

};
