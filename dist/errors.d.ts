import { Maybe } from './utils';
import { QueueNode, QueueOrderPointer } from './queue-node';
export declare enum QueueErrorCode {
    ID_BAD_TYPE = 3,
    ID_BAD_REGEX = 5,
    QUEUE_ORDER_POINTER_BAD_TYPE = 7,
    QUEUE_ORDER_POINTER_BAD_ARRAY = 9,
    QUEUE_ORDER_POINTER_AFTER_BAD = 11,
    QUEUE_ORDER_POINTER_BEFORE_BAD = 13,
    CONFIG_INVALID = 15,
    ADD_POSSIBLE_CIRCULAR_DEPENDENCY = 2
}
export declare enum ErrorThrowLevel {
    NONE = 0,
    ADD_POSSIBLE_CIRCULAR_DEPENDENCY = 1,
    ALL = 1
}
export declare function isErrorThrowLevel(level: any): level is ErrorThrowLevel;
export declare function getErrorMessage(code: QueueErrorCode): string | undefined;
export declare class QueueError extends Error {
    readonly code: QueueErrorCode;
    readonly cause?: Error;
    constructor(code: QueueErrorCode, cause?: Error);
}
export declare class QueueNodeError<T> extends QueueError {
    readonly node: QueueNode<T>;
    after: QueueOrderPointer | null;
    before: QueueOrderPointer | null;
    constructor(code: QueueErrorCode, node: QueueNode<T>, after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>, cause?: Error);
}
//# sourceMappingURL=errors.d.ts.map