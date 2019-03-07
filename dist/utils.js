(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var errors_1 = require("./errors");
    var regex = /^\w-$/;
    exports.getRegexString = function () { return regex.toString(); };
    // export function isServiceIdentifier(id: any, throws?: true): true | never;
    // export function isServiceIdentifier(id: any, throws: false): id is ServiceIdentifier;
    function isServiceIdentifier(id, throws) {
        if (throws === void 0) { throws = true; }
        if (typeof id !== 'string' && typeof id !== 'symbol') {
            if (throws) {
                throw new errors_1.QueueError(errors_1.QueueErrorCode.ID_BAD_TYPE);
            }
            return false;
        }
        if (typeof id === 'string' && !regex.test(id)) {
            if (throws) {
                throw new errors_1.QueueError(errors_1.QueueErrorCode.ID_BAD_REGEX);
            }
            return false;
        }
        return true;
    }
    exports.isServiceIdentifier = isServiceIdentifier;
    function isQueueConfig(config) {
        return (typeof config === 'object' && config !== null
            && (errors_1.isErrorThrowLevel(config.errorLevel)
                || Array.isArray(config.errorLevel) && config.errorLevel.every(errors_1.isErrorThrowLevel)));
    }
    exports.isQueueConfig = isQueueConfig;
});
//# sourceMappingURL=utils.js.map