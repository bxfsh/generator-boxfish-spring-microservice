var YAML = require('yamljs');

module.exports = class Writter {
    constructor(generator) {
        this.generator         = generator;
        this.props             = generator.props;
        this.specification     = YAML.load(this.props.filePath);
        this.baseFolder        = this.specification.metadata.jar_name;
        this.mainFolder        = this.baseFolder + "/src/main/java"
        this.mainPackageFolder = this.mainFolder + "/" + (this.specification.metadata.base_package.replace(/\./gi, "/"))
        this.testFolder        = this.baseFolder + "/src/test/java"
        this.testPackageFolder = this.testFolder + "/" + (this.specification.metadata.base_package.replace(/\./gi, "/"))
    }

    launch() {
        var templateForRootFiles = this.templateForRootFiles();
        for (var i = 0; i < templateForRootFiles.length; i++) {
            var template = templateForRootFiles[i];
            this.generator.fs.copyTpl(
              this.generator.templatePath(template.source),
              this.generator.destinationPath(template.destination),
              { s: this.specification }
            );
        }
    }

    templateForRootFiles() {
        return [
            { "source": "build.gradle"     , "destination": this.baseFolder + "/build.gradle" },
            { "source": "AppEntry.java"    , "destination": this.mainPackageFolder + "/AppEntry.java" },
            { "source": "AppEntryTest.java", "destination": this.testPackageFolder + "/AppEntryTest.java" }
        ]
    }
}
