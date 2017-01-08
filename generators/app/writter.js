var YAML = require('yamljs');
var Utils = require('./utils');

module.exports = class Writter {
    constructor(generator) {
        this.generator         = generator;
        this.specification     = YAML.load(generator.props.specFile);
        this.utils             = new Utils(this.specification);

        this.baseFolder        = this.specification.metadata.jar_name;
        this.mainFolder        = this.baseFolder + "/src/main/java"
        this.mainPackageFolder = this.mainFolder + "/" + this.utils.packageToFolder(this.specification.metadata.base_package)
        this.testFolder        = this.baseFolder + "/src/test/java"
        this.testPackageFolder = this.testFolder + "/" + this.utils.packageToFolder(this.specification.metadata.base_package)
    }

    launch() {
        var utils = this.utils;

        var templateForRootFiles = this.templateForRootFiles();
        for (var i = 0; i < templateForRootFiles.length; i++) {
            var template = templateForRootFiles[i];
            this.generator.fs.copyTpl(
              this.generator.templatePath(template.source),
              this.generator.destinationPath(template.destination),
              {
                  specification: this.specification,
                  s: this.specification
              }
            );
        }

        var templateForDomainFiles = this.templateForDomainFiles();
        for (var i = 0; i < templateForDomainFiles.length; i++) {
            var template = templateForDomainFiles[i];
            var entities = this.specification.entities;
            for (var entityName in entities) {
                var entity    = entities[entityName];
                entity.id     = entityName;

                var source      = template.source;
                var destination = template.destination
                    .replace('{entityPackage}', utils.packageToFolder(utils.domainPackageOf(entity)))
                    .replace('{entityName}', utils.packageToFolder(utils.entityNameOf(entity)));

                this.generator.fs.copyTpl(
                  this.generator.templatePath(source),
                  this.generator.destinationPath(destination),
                  {
                      e: entity,
                      entity: entity,
                      utils: utils
                  }
                );
            }
        }
    }

    templateForRootFiles() {
        return [
            { "source": "build.gradle"     , "destination": this.baseFolder + "/build.gradle" },
            { "source": "AppEntry.java"    , "destination": this.mainPackageFolder + "/AppEntry.java" },
            { "source": "AppEntryTest.java", "destination": this.testPackageFolder + "/AppEntryTest.java" }
        ]
    }

    templateForDomainFiles() {
        return [
            { "source": "Entity.java"    , "destination": this.mainPackageFolder + "/{entityPackage}/{entityName}.java" }/*,
            { "source": "EntityTest.java", "destination": this.testPackageFolder + "/domain.{entityPackage}/{entityName}Test.java" }*/
        ]
    }
}
