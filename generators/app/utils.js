var changeCase = require('change-case');
var pluralize = require('pluralize');

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

    isEntityAttributeRequired(attribute) {
        return attribute.isInsertableRequired && attribute.isUpdatableRequired;
    }

    hasEntityAnyAttributeOfType(entity, type) {
        for (var attributeName in entity.attributes) {
            var attribute = entity.attributes[attributeName];
            if (this.entityAttributeTypeOf(attribute) == type)
                return true;
        }
        return false;
    }

    hasEntityAnyNotNull(entity) {
        for (var attributeName in entity.attributes) {
            var attribute = entity.attributes[attributeName];
            if (this.isEntityAttributeRequired(attribute))
                return true;
        }
        return false;
    }

    entityAttributeTypeOf(attribute) {
        var javaType = this.javaTypeOf(attribute.rawType);
        if (javaType == "Instant")
            return "Timestamp";
        return javaType;
    }

    entityAttributeColumnOf(attribute) {
        return changeCase.snake(attribute.id);
    }

    entityAttributeNameOf(attribute) {
        return changeCase.camel(attribute.id);
    }

    javaTypeOfId(entity) {
        if (entity.properties != null && entity.properties.id_type != null)
            return this.javaTypeOf(entity.properties.id_type);
        else
            return "Integer";
    }

    javaTypeOf(type) {
        var snaked = changeCase.snake(type);
        switch (snaked) {
            case "external_key":
            case "text":
            case "long_text":
                return "String";
            case "number":
                return "Integer";
            case "decimal":
            case "big_decimal":
                return "BigDecimal";
            case "datetime":
            case "date":
            case "timestamp":
                return "Instant";
            default:
                return changeCase.pascal(snaked);
        }
    }

}
