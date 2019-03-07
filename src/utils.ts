import { ErrorThrowLevel, isErrorThrowLevel, QueueError, QueueErrorCode } from './errors';

export type Maybe<T> = T | null | undefined;

export type ServiceIdentifier = string | symbol;

const regex = /^[\w-]+$/;
export const getRegexString = () => regex.toString();

// export function isServiceIdentifier(id: any, throws?: true): true | never;
// export function isServiceIdentifier(id: any, throws: false): id is ServiceIdentifier;
export function isServiceIdentifier(id: any, throws = true): id is ServiceIdentifier {
  if (typeof id !== 'string' && typeof id !== 'symbol') {
    if (throws) {
      throw new QueueError(QueueErrorCode.ID_BAD_TYPE);
    }
    return false;
  }
  if (typeof id === 'string' && !regex.test(id)) {
    if (throws) {
      throw new QueueError(QueueErrorCode.ID_BAD_REGEX);
    }
    return false;
  }
  return true;
}

export interface IQueueConfig {
  errorLevel: ErrorThrowLevel | ErrorThrowLevel[];
}

export function isQueueConfig(config: any): config is IQueueConfig {
  return (
    typeof config === 'object' && config !== null
    && (
      isErrorThrowLevel(config.errorLevel)
      || (
        Array.isArray(config.errorLevel)
        && config.errorLevel.length > 0
        && config.errorLevel.every(isErrorThrowLevel)
      )
    )
  );
}