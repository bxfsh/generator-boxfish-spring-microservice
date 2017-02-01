var Utils = require('./utils');
var Mocks = require('./mocks');

module.exports = class Writter {
    constructor(generator) {
        this.generator         = generator;
    }

    using(specification) {
        this.specification     = specification;
        this.utils             = new Utils(this.specification);
        this.mocks             = new Mocks();

        this.baseFolder        = this.specification.metadata.jar_name;
        this.mainFolder        = this.baseFolder + "/src/main/java"
        this.mainPackageFolder = this.mainFolder + "/" + this.utils.packageToFolder(this.specification.metadata.base_package)
        this.testFolder        = this.baseFolder + "/src/test/java"
        this.testPackageFolder = this.testFolder + "/" + this.utils.packageToFolder(this.specification.metadata.base_package)
        return this;
    }

    write() {
        var utils = this.utils;
        var mocks = this.mocks;

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
                var source      = template.source;
                var destination = template.destination
                    .replace('{entityPackage}', utils.packageToFolder(utils.domainPackageOf(entity)))
                    .replace('{entityName}', utils.packageToFolder(utils.entityNameOf(entity)))
                    .replace('{repositoryName}', utils.packageToFolder(utils.repositoryNameOf(entity)))
                    .replace('{serviceName}', utils.packageToFolder(utils.serviceNameOf(entity)));

                this.generator.fs.copyTpl(
                  this.generator.templatePath(source),
                  this.generator.destinationPath(destination),
                  {
                      e: entity,
                      entity: entity,
                      utils: utils,
                      mocks: mocks
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
            { "source": "Entity.java"          , "destination": this.mainPackageFolder + "/{entityPackage}/{entityName}.java" },
            { "source": "EntityTest.java"      , "destination": this.testPackageFolder + "/{entityPackage}/{entityName}Test.java" },
            { "source": "Repository.java"      , "destination": this.mainPackageFolder + "/{entityPackage}/{repositoryName}.java" },
            { "source": "RepositoryCustom.java", "destination": this.mainPackageFolder + "/{entityPackage}/{repositoryName}Custom.java" },
            { "source": "RepositoryTest.java"  , "destination": this.testPackageFolder + "/{entityPackage}/{repositoryName}Test.java" },
            { "source": "Service.java"         , "destination": this.mainPackageFolder + "/{entityPackage}/{serviceName}.java" },
            { "source": "ServiceTest.java"     , "destination": this.testPackageFolder + "/{entityPackage}/{serviceName}Test.java" }
        ]
    }
}
