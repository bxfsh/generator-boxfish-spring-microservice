module.exports = class Normalizer {
    constructor(yaml) {
        this.yaml = yaml;
    }

    normalize() {
        for (var endpointName in this.yaml.endpoints) {
            var endpoint = this.yaml.endpoints[endpointName];
            endpoint.id = endpointName;
        }

        for (var entityName in this.yaml.entities) {
            var entity = this.yaml.entities[entityName];
            entity.id = entityName;

            for (var attributeName in entity.attributes)
                entity.attributes[attributeName] = this.makeAttributeFrom(
                    attributeName,
                    entity.attributes[attributeName])
        }
    }

    makeAttributeFrom(attributeName, specs) {
        var frags = specs.split(/\ /gi);
        return {
            "id"                  : attributeName,
            "rawSpec"             : specs,
            "rawType"             : frags[0],
            "isInsertableRequired": this.hasSpec(frags, ["insertable_required"]),
            "isInsertable"        : this.hasSpec(frags, ["insertable", "insertable_required"]),
            "isUpdatableRequired" : this.hasSpec(frags, ["updatable_required"]),
            "isUpdatableR"        : this.hasSpec(frags, ["updatable", "updatable_required"]),
            "isQueryable"         : this.hasSpec(frags, ["query_eq", "query_in", "query_range", "query_like"]),
            "queryType"           : this.firstOf(frags, "query")
        };
    }

    hasSpec(frags, spec) {
        if (spec == null) return false;
        if (spec instanceof String) spec = [spec];
        for (var i = 0; i < spec.length; i++) {
            var specItem = spec[i];
            if (frags.indexOf(specItem) != -1)
                return true;
        }
        return false;
    }

    firstOf(frags, spec) {
        for (var i = 0; i < frags.length; i++) {
            var frag = frags[i];
            if (frag.startsWith(spec))
                return frag;
        }
        return null;
    }
}
