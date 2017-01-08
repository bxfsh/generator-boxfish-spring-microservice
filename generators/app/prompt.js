var yosay = require('yosay');
var chalk = require('chalk');

module.exports = class Prompt {
    displayLogo(logger) {
        logger(yosay('BOXFISH ' + chalk.red('Spring Rest Microservice') + ' Generator'));
        return this;
    }

    buildPrompts() {
        return [
            {
                type: 'input',
                name: 'filePath',
                message: 'What is the specification file?',
                default: 'specs-microservices/boxfish-apis-youtube-channel-curation.yml'
            }
        ];
    }
}
