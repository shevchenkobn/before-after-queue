(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./utils", "./queue-node"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var tslib_1 = require("tslib");
    var utils_1 = require("./utils");
    var queue_node_1 = require("./queue-node");
    var QueueErrorCode;
    (function (QueueErrorCode) {
        QueueErrorCode[QueueErrorCode["ID_BAD_TYPE"] = 3] = "ID_BAD_TYPE";
        QueueErrorCode[QueueErrorCode["ID_BAD_REGEX"] = 5] = "ID_BAD_REGEX";
        QueueErrorCode[QueueErrorCode["QUEUE_ORDER_POINTER_BAD_TYPE"] = 7] = "QUEUE_ORDER_POINTER_BAD_TYPE";
        QueueErrorCode[QueueErrorCode["QUEUE_ORDER_POINTER_BAD_ARRAY"] = 9] = "QUEUE_ORDER_POINTER_BAD_ARRAY";
        QueueErrorCode[QueueErrorCode["QUEUE_ORDER_POINTER_AFTER_BAD"] = 11] = "QUEUE_ORDER_POINTER_AFTER_BAD";
        QueueErrorCode[QueueErrorCode["QUEUE_ORDER_POINTER_BEFORE_BAD"] = 13] = "QUEUE_ORDER_POINTER_BEFORE_BAD";
        QueueErrorCode[QueueErrorCode["CONFIG_INVALID"] = 15] = "CONFIG_INVALID";
        QueueErrorCode[QueueErrorCode["ADD_POSSIBLE_CIRCULAR_DEPENDENCY"] = 2] = "ADD_POSSIBLE_CIRCULAR_DEPENDENCY";
    })(QueueErrorCode = exports.QueueErrorCode || (exports.QueueErrorCode = {}));
    var ErrorThrowLevel;
    (function (ErrorThrowLevel) {
        ErrorThrowLevel[ErrorThrowLevel["NONE"] = 0] = "NONE";
        ErrorThrowLevel[ErrorThrowLevel["ADD_POSSIBLE_CIRCULAR_DEPENDENCY"] = 1] = "ADD_POSSIBLE_CIRCULAR_DEPENDENCY";
        ErrorThrowLevel[ErrorThrowLevel["ALL"] = 1] = "ALL";
    })(ErrorThrowLevel = exports.ErrorThrowLevel || (exports.ErrorThrowLevel = {}));
    function isErrorThrowLevel(level) {
        return typeof level === 'number' && level >= ErrorThrowLevel.NONE && level <= ErrorThrowLevel.ALL; //NOTE: level >= -2147483648 && level <= 2147483647
    }
    exports.isErrorThrowLevel = isErrorThrowLevel;
    var messages = new Map([
        [QueueErrorCode.ID_BAD_TYPE, 'A Service Identifier can be either string or symbol'],
        [QueueErrorCode.ID_BAD_REGEX, "A string Service Identifier must match the regexp: " + utils_1.getRegexString()],
        [QueueErrorCode.QUEUE_ORDER_POINTER_BAD_TYPE, "A Queue Order Pointer (before or after) can be a Service Identifier array, 'all' or 'all always' strings"],
        [QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY, 'A Queue Order Pointer (before or after) is not a valid Service Identifier array. See the `cause` property for details.'],
        [QueueErrorCode.QUEUE_ORDER_POINTER_AFTER_BAD, 'An after Queue Order Pointer is not a valid. See the `cause` property for details.'],
        [QueueErrorCode.QUEUE_ORDER_POINTER_BEFORE_BAD, 'A before Queue Order Pointer is not a valid. See the `cause` property for details.'],
        [QueueErrorCode.CONFIG_INVALID, 'Config is invalid. It must be an object, that has following properties:\n' +
                '`errorLevel` with Error Throw Level (via bitwise OR) or an array of Error Throw Level;'],
        [QueueErrorCode.ADD_POSSIBLE_CIRCULAR_DEPENDENCY, 'Add failed. The new value possibly has a circular dependency. See `node`, `after`, `before` properties for details.'],
    ]);
    function getErrorMessage(code) {
        if (messages.has(code)) {
            return messages.get(code);
        }
        throw new TypeError("UNKNOWN_CODE: " + code);
    }
    exports.getErrorMessage = getErrorMessage;
    var QueueError = /** @class */ (function (_super) {
        tslib_1.__extends(QueueError, _super);
        function QueueError(code, cause) {
            var _this = _super.call(this, messages.get(code)) || this;
            _this.code = code;
            _this.cause = cause;
            return _this;
        }
        return QueueError;
    }(Error));
    exports.QueueError = QueueError;
    var QueueNodeError = /** @class */ (function (_super) {
        tslib_1.__extends(QueueNodeError, _super);
        function QueueNodeError(code, node, after, before, cause) {
            var _this = _super.call(this, code, cause) || this;
            _this.node = node;
            _this.after = after ? queue_node_1.cloneQueueOrderPointer(after) : null;
            _this.before = before ? queue_node_1.cloneQueueOrderPointer(before) : null;
            return _this;
        }
        return QueueNodeError;
    }(QueueError));
    exports.QueueNodeError = QueueNodeError;
});
//# sourceMappingURL=errors.js.map