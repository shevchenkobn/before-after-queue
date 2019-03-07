import { IQueueConfig, ServiceIdentifier } from './utils';
import { QueueNode } from './queue-node';
import { ErrorThrowLevel } from './errors';

export interface IBeforeAfterQueue<T> {
  // new (config: Partial<IQueueConfig>): IBeforeAfterQueue<T>;
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

export class BeforeAfterQueue<T> implements IBeforeAfterQueue<T> {
  constructor(config: Partial<IQueueConfig>) {

  }

  * [Symbol.iterator](): IterableIterator<QueueNode<T[]>> {
    return undefined;
  }

  add(id: ServiceIdentifier, value: T[]): boolean {
    return false;
  }

  clear(): void {
  }

  count(): number {
    return 0;
  }

  delete(id: ServiceIdentifier): boolean {
    return false;
  }

  get(id: ServiceIdentifier): T[] {
    return [];
  }

  getConfig(): IQueueConfig {
    return {
      errorLevel: ErrorThrowLevel.ALL,
    };
  }

  has(id: ServiceIdentifier): boolean {
    return false;
  }

  setConfig(config: Partial<IQueueConfig>): void {
  }

  update(id: ServiceIdentifier, value: T[]): boolean {
    return false;
  }
}
