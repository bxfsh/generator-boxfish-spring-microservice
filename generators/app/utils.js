var changeCase = require('change-case')

module.exports = class Utils {
    constructor(specification) {
        this.specification = specification;
        this.basePackage = this.specification.metadata.base_package;
    }

    packageToFolder(packageName) {
        return packageName.replace(/\./gi, "/");
    }

    domainPackageOf(entity) {
        return 'domain.' + this.fieldNameOf(entity);
    }

    fullDomainPackageOf(entity) {
        return this.basePackage + '.' + this.domainPackageOf(entity);
    }

    fieldNameOf(entity) {
        return changeCase.camel(entity.id);
    }

    tableNameOf(entity) {
        return changeCase.snake(entity.id);
    }

    entityNameOf(entity) {
        return changeCase.pascal(entity.id) + 'Entity';
    }

}
