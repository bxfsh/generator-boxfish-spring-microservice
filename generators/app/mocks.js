var randomstring = require("randomstring");
var moment = require('moment');

module.exports = class Mocks {
    unwrappedFor(rawType) {
        return this._unwrappedValueOf(rawType);
    }

    wrappedFor(rawType) {
        return this._wrapperStart(rawType) + this.unwrappedFor(rawType) + this._wrapperEnd(rawType);
    }

    _unwrappedValueOf(rawType) {
        switch (rawType) {
            case "long":
            case "big_number":
            case "number":
                return parseInt(Math.abs(Math.random() * 100000));
            case "decimal":
            case "big_decimal":
                return parseInt(Math.abs(Math.random() * 100000)) + "." + parseInt(Math.abs(Math.random() * 2));
            case "datetime":
            case "date":
            case "timestamp":
                return moment()
                    .add(parseInt(Math.random() * 31), 'days')
                    .add(parseInt(Math.random() * 12), 'months')
                    .add(parseInt(Math.random() * 10), 'years')
                    .toISOString();
            case "external_key":
            case "text":
            case "long_text":
            default:
                return randomstring.generate();
        }
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
