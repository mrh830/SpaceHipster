SpaceHipster.Preloader = function (game) {

    this.background = null;
    this.preloaderBar = null;

    this.ready = false;

};

SpaceHipster.Preloader.prototype = {

    preload: function () {

        this.splash = this.add.sprite(this.game.world.centerX, this.game.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloaderBar = this.add.sprite(this.game.world.centerX, this.game.centerY + 128, 'preloaderBar');
        this.preloaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloaderBar);

        this.load.image('space', 'assets/images/space.png');
        this.load.image('rock', 'assets/images/rock.png');
        this.load.spritesheet('player', 'assets/images/player.png', 12, 12);
        this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
        this.load.image('playerParticle', 'assets/images/player-particle.png');
        this.load.audio('collect', 'assets/audio/collect.ogg');
        this.load.audio('explosion', 'assets/audio/explosion.ogg');
    },

    create: function () {

        this.state.start('MainMenu');
    }
};
