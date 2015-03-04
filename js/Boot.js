var SpaceHipster = {};

SpaceHipster.Boot = function (game) {

};

SpaceHipster.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        } else {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1920, 1080);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloaderBar', 'assets/images/preloader-bar.png');

    },

    create: function () {

        this.game.stage.backgroundColor = '#fff';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('Preloader');

    }

};
