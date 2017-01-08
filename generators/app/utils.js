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

    repositoryNameOf(entity) {
        return changeCase.pascal(entity.id) + 'Repository';
    }

    serviceNameOf(entity) {
        return changeCase.pascal(entity.id) + 'Service';
    }

    entityIdGeneratorOf(entity) {
        if (this.javaTypeOfId(entity) == "String")
            return { "name": "system-uuid", "strategy": "uuid" }
        else
            return null;
    }

    javaTypeOfId(entity) {
        if (entity.properties != null && entity.properties.id_type != null)
            return this.javaTypeOf(entity.properties.id_type);
        else
            return "Integer";
    }

    javaTypeOf(type) {
        var pascalType = changeCase.pascal(type);
        switch (pascalType) {
            case "ExternalKey":
            case "Text":
            case "LongText":
                return "String";
            case "Number":
                return "Integer";
            case "Decimal":
                return "BigDecimal";
            default:
                return pascalType;
        }
    }

}
