import { Maybe, ServiceIdentifier } from './utils';
export declare type QueueOrderPointer = ServiceIdentifier[] | 'all' | 'all always';
export declare function isQueueOrderPointer(pointer: any, throws?: boolean): pointer is QueueOrderPointer;
export declare function cloneQueueOrderPointer(pointer: QueueOrderPointer): QueueOrderPointer;
export declare class QueueNode<T> {
    readonly id: ServiceIdentifier;
    readonly value: T[];
    after: QueueOrderPointer | null;
    before: QueueOrderPointer | null;
    constructor(id: ServiceIdentifier, values: T[], after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>);
}
export declare class QueueInnerNode<T> {
    readonly id: ServiceIdentifier;
    value: T[];
    after: QueueOrderPointer | null;
    before: QueueOrderPointer | null;
    prev: QueueInnerNode<T> | null;
    next: QueueInnerNode<T> | null;
    constructor(id: ServiceIdentifier, value: T, after?: Maybe<QueueOrderPointer>, before?: Maybe<QueueOrderPointer>, prev?: Maybe<QueueInnerNode<T>>, next?: Maybe<QueueInnerNode<T>>);
}
//# sourceMappingURL=queue-node.d.ts.map