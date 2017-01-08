const yosay = require('yosay');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class Prompt {
    constructor(generator) {
        this.generator = generator;
    }

    displayLogo(logger) {
        this.generator.log(yosay('BOXFISH ' + chalk.red('Spring Rest Microservice') + ' Generator'));
        return this;
    }

    prompt() {
        var generator = this.generator;
        var filesInSpecsFolder = [];

        return generator
            .prompt([
                {
                    type: 'input',
                    name: 'specsFolder',
                    message: 'What is the specification file?',
                    default: 'specs-microservices'
                },
                {
                    when: function(response) {
                        if (!fs.existsSync(response.specsFolder)) fs.mkdirSync(response.specsFolder);

                        var files = fs.readdirSync(response.specsFolder);
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            if (!file.startsWith('.'))
                                filesInSpecsFolder.push(response.specsFolder + '/' + file);
                        }

                        return true;
                    },
                    type: 'list',
                    name: 'specFile',
                    message: 'What the specification you will use for generation?',
                    choices: filesInSpecsFolder
                }
            ]).then(
                function (props) { generator.props = props; }
                .bind(generator)
            );
    }
}
