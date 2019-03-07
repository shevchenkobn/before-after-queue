import { isServiceIdentifier, Maybe, ServiceIdentifier } from './utils';
import { QueueError, QueueErrorCode } from './errors';

export type QueueOrderPointer = ServiceIdentifier[] | 'all' | 'all always';

// export function isQueueOrderPointer(pointer: any, throws?: true): true | never;
// export function isQueueOrderPointer(pointer: any, throws: false): pointer is QueueOrderPointer;
export function isQueueOrderPointer(pointer: any, throws = true): pointer is QueueOrderPointer {
  if (pointer === 'all' || pointer === 'all always') {
    return true;
  }
  if (Array.isArray(pointer)) {
    if (!throws) {
      return pointer.length > 0 && pointer.every(id => isServiceIdentifier(id, false));
    }
    if (pointer.length === 0) {
      throw new QueueError(QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY);
    }
    try {
      return pointer.length > 0 && pointer.every(id => isServiceIdentifier(id));
    } catch (err) {
      throw new QueueError(QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY, err);
    }
  }
  if (throws) {
    throw new QueueError(QueueErrorCode.QUEUE_ORDER_POINTER_BAD_TYPE);
  }
  return false;
}

export function cloneQueueOrderPointer(pointer: QueueOrderPointer) {
  if (typeof pointer === 'string') {
    return pointer;
  }
  return pointer.slice();
}

export class QueueNode<T> {
  public readonly id: ServiceIdentifier;
  public readonly value: T[];
  public after!: QueueOrderPointer | null;
  public before!: QueueOrderPointer | null;

  constructor(id: ServiceIdentifier, values: T[], after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>) {
    this.id = id;
    this.value = values.slice();

    this.after = after ? cloneQueueOrderPointer(after) : null;
    this.before = before ? cloneQueueOrderPointer(before) : null;
  }
}

export class QueueInnerNode<T> {
  public readonly id!: ServiceIdentifier;
  public value: T[];
  public after!: QueueOrderPointer | null;
  public before!: QueueOrderPointer | null;
  public prev!: QueueInnerNode<T> | null;
  public next!: QueueInnerNode<T> | null;

  constructor(id: ServiceIdentifier, value: T, after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>, prev?: Maybe<QueueInnerNode<T>>, next?: Maybe<QueueInnerNode<T>>) {
    if (isServiceIdentifier(id, true)) {
      this.id = id;
    }
    this.value = [value];

    if (!after) {
      this.after = null;
    } else if (isQueueOrderPointer(after, true)) {
      this.after = cloneQueueOrderPointer(after);
    }

    if (!before) {
      this.before = null;
    } else if (isQueueOrderPointer(before, true)) {
      this.before = cloneQueueOrderPointer(before);
    }

    this.prev = prev || null;
    this.next = prev || null;
  }
}
