import { IQueueConfig, ServiceIdentifier } from './utils';
import { QueueNode } from './queue-node';
export interface IBeforeAfterQueue<T> {
    setConfig(config: Partial<IQueueConfig>): void;
    getConfig(): IQueueConfig;
    [Symbol.iterator](): IterableIterator<QueueNode<T[]>>;
    add(id: ServiceIdentifier, value: T[]): boolean;
    update(id: ServiceIdentifier, value: T[]): boolean;
    has(id: ServiceIdentifier): boolean;
    get(id: ServiceIdentifier): T[];
    count(): number;
    delete(id: ServiceIdentifier): boolean;
    clear(): void;
}
export declare class BeforeAfterQueue<T> implements IBeforeAfterQueue<T> {
    constructor(config: Partial<IQueueConfig>);
    [Symbol.iterator](): IterableIterator<QueueNode<T[]>>;
    add(id: ServiceIdentifier, value: T[]): boolean;
    clear(): void;
    count(): number;
    delete(id: ServiceIdentifier): boolean;
    get(id: ServiceIdentifier): T[];
    getConfig(): IQueueConfig;
    has(id: ServiceIdentifier): boolean;
    setConfig(config: Partial<IQueueConfig>): void;
    update(id: ServiceIdentifier, value: T[]): boolean;
}
//# sourceMappingURL=queue.d.ts.map