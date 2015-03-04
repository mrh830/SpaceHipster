SpaceHipster.MainMenu = function (game) {

};

SpaceHipster.MainMenu.prototype = {

    create: function () {

        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        this.background.autoScroll(-20, 0);

        var text = "Click/tap to begin";
        var style = {font: "30px Arial", fill: "#fff", align: "center"};
        var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
        t.anchor.setTo(0.5);

        text = "Highest score: " + this.highestScore;
        style = {font: "15px Arial", fill: "#fff", align: "center"};

        var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
        h.anchor.setTo(0.5);
    },

    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.state.start('Game');
        }

    }
};
