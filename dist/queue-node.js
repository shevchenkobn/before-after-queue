(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils", "./errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var utils_1 = require("./utils");
    var errors_1 = require("./errors");
    // export function isQueueOrderPointer(pointer: any, throws?: true): true | never;
    // export function isQueueOrderPointer(pointer: any, throws: false): pointer is QueueOrderPointer;
    function isQueueOrderPointer(pointer, throws) {
        if (throws === void 0) { throws = true; }
        if (pointer === 'all' || pointer === 'all always') {
            return true;
        }
        if (Array.isArray(pointer)) {
            if (!throws) {
                return pointer.every(function (id) { return utils_1.isServiceIdentifier(id, false); });
            }
            try {
                return pointer.every(function (id) { return utils_1.isServiceIdentifier(id); });
            }
            catch (err) {
                throw new errors_1.QueueError(errors_1.QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY, err);
            }
        }
        if (throws) {
            throw new errors_1.QueueError(errors_1.QueueErrorCode.QUEUE_ORDER_POINTER_BAD_TYPE);
        }
        return false;
    }
    exports.isQueueOrderPointer = isQueueOrderPointer;
    function cloneQueueOrderPointer(pointer) {
        if (typeof pointer === 'string') {
            return pointer;
        }
        return pointer.slice();
    }
    exports.cloneQueueOrderPointer = cloneQueueOrderPointer;
    var QueueNode = /** @class */ (function () {
        function QueueNode(id, values, after, before) {
            this.id = id;
            this.value = values.slice();
            this.after = after ? cloneQueueOrderPointer(after) : null;
            this.before = before ? cloneQueueOrderPointer(before) : null;
        }
        return QueueNode;
    }());
    exports.QueueNode = QueueNode;
    var QueueInnerNode = /** @class */ (function () {
        function QueueInnerNode(id, value, after, before, prev, next) {
            if (utils_1.isServiceIdentifier(id, true)) {
                this.id = id;
            }
            this.value = [value];
            if (!after) {
                this.after = null;
            }
            else if (isQueueOrderPointer(after, true)) {
                this.after = cloneQueueOrderPointer(after);
            }
            if (!before) {
                this.before = null;
            }
            else if (isQueueOrderPointer(before, true)) {
                this.before = cloneQueueOrderPointer(before);
            }
            this.prev = prev || null;
            this.next = prev || null;
        }
        return QueueInnerNode;
    }());
    exports.QueueInnerNode = QueueInnerNode;
});
//# sourceMappingURL=queue-node.js.map