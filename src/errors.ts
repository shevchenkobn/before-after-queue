import { getRegexString, Maybe } from './utils';
import { cloneQueueOrderPointer, QueueNode, QueueOrderPointer } from './queue-node';

export enum QueueErrorCode {
  ID_BAD_TYPE = 3,
  ID_BAD_REGEX = 5,

  QUEUE_ORDER_POINTER_BAD_TYPE = 7,
  QUEUE_ORDER_POINTER_BAD_ARRAY = 9,
  QUEUE_ORDER_POINTER_AFTER_BAD = 11,
  QUEUE_ORDER_POINTER_BEFORE_BAD = 13,

  CONFIG_INVALID = 15,

  ADD_POSSIBLE_CIRCULAR_DEPENDENCY = 2,
}

export enum ErrorThrowLevel {
  NONE = 0,

  ADD_POSSIBLE_CIRCULAR_DEPENDENCY = 1,

  ALL = ErrorThrowLevel.ADD_POSSIBLE_CIRCULAR_DEPENDENCY,
}

export function isErrorThrowLevel(level: any): level is ErrorThrowLevel {
  return typeof level === 'number' && level >= ErrorThrowLevel.NONE && level <= ErrorThrowLevel.ALL;//NOTE: level >= -2147483648 && level <= 2147483647
}

const messages: ReadonlyMap<QueueErrorCode, string> = new Map([
  [QueueErrorCode.ID_BAD_TYPE, 'A Service Identifier can be either string or symbol'],
  [QueueErrorCode.ID_BAD_REGEX, `A string Service Identifier must match the regexp: ${getRegexString()}`],

  [QueueErrorCode.QUEUE_ORDER_POINTER_BAD_TYPE, `A Queue Order Pointer (before or after) can be a Service Identifier array, 'all' or 'all always' strings`],
  [QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY, 'A Queue Order Pointer (before or after) is not a valid Service Identifier array. See the `cause` property for details.'],
  [QueueErrorCode.QUEUE_ORDER_POINTER_AFTER_BAD, 'An after Queue Order Pointer is not a valid. See the `cause` property for details.'],
  [QueueErrorCode.QUEUE_ORDER_POINTER_BEFORE_BAD, 'A before Queue Order Pointer is not a valid. See the `cause` property for details.'],

  [QueueErrorCode.CONFIG_INVALID, 'Config is invalid. It must be an object, that has following properties:\n' +
  '`errorLevel` with Error Throw Level (via bitwise OR) or an array of Error Throw Level;'],

  [QueueErrorCode.ADD_POSSIBLE_CIRCULAR_DEPENDENCY, 'Add failed. The new value possibly has a circular dependency. See `node`, `after`, `before` properties for details.'],
]);

export function getErrorMessage(code: QueueErrorCode) {
  if (messages.has(code)) {
    return messages.get(code);
  }
  throw new TypeError(`UNKNOWN_CODE: ${code}`);
}

export class QueueError extends Error {
  public readonly code: QueueErrorCode;
  public readonly cause?: Error;

  constructor(code: QueueErrorCode, cause?: Error) {
    super(messages.get(code));
    this.code = code;
    this.cause = cause;
  }
}

export class QueueNodeError<T> extends QueueError {
  public readonly node: QueueNode<T>;
  public after!: QueueOrderPointer | null;
  public before!: QueueOrderPointer | null;

  constructor(code: QueueErrorCode, node: QueueNode<T>, after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>, cause?: Error) {
    super(code, cause);
    this.node = node;

    this.after = after ? cloneQueueOrderPointer(after) : null;
    this.before = before ? cloneQueueOrderPointer(before) : null;
  }
}
