'use strict';
var Generator = require('yeoman-generator');
var Prompt = require('./prompt');
var Writter = require('./writter');

module.exports = Generator.extend({
    prompting: function () {
        return new Prompt(this)
            .displayLogo()
            .prompt();
    },

    writing: function () {
        new Writter(this).launch();
    },

    install: function () {
        //this.installDependencies();
    }
});
