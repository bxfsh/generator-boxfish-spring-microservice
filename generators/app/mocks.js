module.exports = class Mocks {
    unwrappedFor(rawType) {
        return "";
    }

    wrappedFor(rawType) {
        return this._wrapperStart(rawType) + this.unwrappedFor(rawType) + this._wrapperEnd(rawType);
    }

    _wrapperStart(rawType) {
        switch (rawType) {
            case "long":
            case "big_number":
                return "Long.valueOf(\"";
            case "number":
                return "Integer.valueOf(\"";
            case "decimal":
            case "big_decimal":
                return "new BigDecimal(\"";
            case "datetime":
            case "date":
            case "timestamp":
                return "Instant.parse(\"";
            default:
                return "\"";
        }
    }

    _wrapperEnd(rawType) {
        switch (rawType) {
            case "long":
            case "big_number":
            case "number":
            case "decimal":
            case "big_decimal":
            case "datetime":
            case "date":
            case "timestamp":
                return "\")";
            default:
                return "\"";
        }
    }
}
