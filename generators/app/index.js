'use strict';
var Generator = require('yeoman-generator');
var YAML = require('yamljs');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
    prompting: function () {
        this.log(yosay('BOXFISH ' + chalk.red('Spring Rest Microservice') + ' Generator'));

        var prompts = [
            {
                type: 'input',
                name: 'filePath',
                message: 'What is the specification file?',
                default: 'service-specs/boxfish-apis-youtube-channel-curation.yml'
            }
        ];

        return this
            .prompt(prompts)
            .then(function (props) { this.props = props; }.bind(this));
    },

    writing: function () {
        var specification = YAML.load(this.props.filePath);
        var baseFolder = specification.metadata.jar_name;

        this.fs.copyTpl(
          this.templatePath('build.gradle'),
          this.destinationPath(baseFolder + '/build.gradle'),
          { s: specification }
        );
    },

    install: function () {
        this.installDependencies();
    }
});
