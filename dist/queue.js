(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var tslib_1 = require("tslib");
    var errors_1 = require("./errors");
    var BeforeAfterQueue = /** @class */ (function () {
        function BeforeAfterQueue(config) {
        }
        BeforeAfterQueue.prototype[Symbol.iterator] = function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        };
        BeforeAfterQueue.prototype.add = function (id, value) {
            return false;
        };
        BeforeAfterQueue.prototype.clear = function () {
        };
        BeforeAfterQueue.prototype.count = function () {
            return 0;
        };
        BeforeAfterQueue.prototype["delete"] = function (id) {
            return false;
        };
        BeforeAfterQueue.prototype.get = function (id) {
            return [];
        };
        BeforeAfterQueue.prototype.getConfig = function () {
            return {
                errorLevel: errors_1.ErrorThrowLevel.ALL
            };
        };
        BeforeAfterQueue.prototype.has = function (id) {
            return false;
        };
        BeforeAfterQueue.prototype.setConfig = function (config) {
        };
        BeforeAfterQueue.prototype.update = function (id, value) {
            return false;
        };
        return BeforeAfterQueue;
    }());
    exports.BeforeAfterQueue = BeforeAfterQueue;
});
//# sourceMappingURL=queue.js.map