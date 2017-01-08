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
        var specification     = YAML.load(this.props.filePath);
        var baseFolder        = specification.metadata.jar_name;
        var mainFolder        = baseFolder + "/src/main/java"
        var mainPackageFolder = mainFolder + "/" + (specification.metadata.base_package.replace(/\./gi, "/"))
        var testFolder        = baseFolder + "/src/test/java"
        var testPackageFolder = testFolder + "/" + (specification.metadata.base_package.replace(/\./gi, "/"))

        var templatesForRoot = [
            { "source": "build.gradle"     , "destination": baseFolder + "/build.gradle" },
            { "source": "AppEntry.java"    , "destination": mainPackageFolder + "/AppEntry.java" },
            { "source": "AppEntryTest.java", "destination": testPackageFolder + "/AppEntryTest.java" }
        ]

        for (var i = 0; i < templatesForRoot.length; i++) {
            var template = templatesForRoot[i];
            this.fs.copyTpl(
              this.templatePath(template.source),
              this.destinationPath(template.destination),
              { s: specification }
            );
        }
    },

    install: function () {
        //this.installDependencies();
    }
});
