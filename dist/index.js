(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./queue", "./queue-node", "./errors", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var queue_1 = require("./queue");
    exports.BeforeAfterQueue = queue_1.BeforeAfterQueue;
    var queue_node_1 = require("./queue-node");
    exports.QueueNode = queue_node_1.QueueNode;
    exports.cloneQueueOrderPointer = queue_node_1.cloneQueueOrderPointer;
    exports.isQueueOrderPointer = queue_node_1.isQueueOrderPointer;
    var errors_1 = require("./errors");
    exports.QueueError = errors_1.QueueError;
    exports.QueueNodeError = errors_1.QueueNodeError;
    exports.QueueErrorCode = errors_1.QueueErrorCode;
    exports.getErrorMessage = errors_1.getErrorMessage;
    exports.ErrorThrowLevel = errors_1.ErrorThrowLevel;
    exports.isErrorThrowLevel = errors_1.isErrorThrowLevel;
    var utils_1 = require("./utils");
    exports.isServiceIdentifier = utils_1.isServiceIdentifier;
    exports.getRegexString = utils_1.getRegexString;
    exports.isQueueConfig = utils_1.isQueueConfig;
});
//# sourceMappingURL=index.js.map