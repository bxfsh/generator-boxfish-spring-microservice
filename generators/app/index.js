'use strict';
var Generator = require('yeoman-generator');
var YAML = require('yamljs');
var Prompt = require('./prompt');
var Writter = require('./writter');
var Normalizer = require('./normalizer');

module.exports = Generator.extend({
    prompting: function () {
        return new Prompt(this)
            .displayLogo()
            .prompt();
    },

    writing: function () {
        var specification = YAML.load(this.props.specFile);
        new Normalizer(specification).normalize();
        new Writter(this).using(specification).write();
    },

    install: function () {
        //this.installDependencies();
    }
});
