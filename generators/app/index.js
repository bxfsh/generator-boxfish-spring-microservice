'use strict';
var Generator = require('yeoman-generator');
var Prompt = require('./prompt');
var Writter = require('./writter');

module.exports = Generator.extend({
    prompting: function () {
        var prompts = new Prompt()
            .displayLogo(this.log)
            .buildPrompts();

        return this.prompt(prompts).then(
            function (props) { this.props = props; }
            .bind(this)
        );
    },

    writing: function () {
        new Writter(this).launch();
    },

    install: function () {
        //this.installDependencies();
    }
});
