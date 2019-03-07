import {
  ErrorThrowLevel,
  getRegexString,
  isQueueConfig,
  isServiceIdentifier,
  QueueError,
  QueueErrorCode,
} from '../dist';
import { matchThrownError } from './utils';

test('getRegexString testing', () => {
  const result = getRegexString();
  expect(typeof result).toBe('string');
  expect(new RegExp(result.substring(1, -1))).toBeInstanceOf(RegExp);
});

test('isServiceIdentifier valid values', () => {
  expect(isServiceIdentifier('asdf')).toBe(true);
  expect(isServiceIdentifier('asdf123', true)).toBe(true);
  expect(isServiceIdentifier('_HGFAs__d-f-123', false)).toBe(true);
  expect(isServiceIdentifier(Symbol())).toBe(true);
  expect(isServiceIdentifier(Symbol('asdf'))).toBe(true);
  expect(isServiceIdentifier(Symbol.for('asdf'))).toBe(true);
});

test('isServiceIdentifier invalid values with throwing', () => {
  const typeError = new QueueError(QueueErrorCode.ID_BAD_TYPE);
  expect(matchThrownError(isServiceIdentifier)).toMatchObject(typeError);
  expect(matchThrownError(isServiceIdentifier, 1234, true)).toMatchObject(typeError);
  expect(matchThrownError(isServiceIdentifier, true, true)).toMatchObject(typeError);
  expect(matchThrownError(isServiceIdentifier, {}, true)).toMatchObject(typeError);

  const regexError = new QueueError(QueueErrorCode.ID_BAD_REGEX);
  expect(matchThrownError(isServiceIdentifier, '', true)).toMatchObject(regexError);
  expect(matchThrownError(isServiceIdentifier, '*')).toMatchObject(regexError);
  expect(matchThrownError(isServiceIdentifier, '%$#&')).toMatchObject(regexError);
});

test('isServiceIdentifier invalid values with throwing', () => {
  expect(isServiceIdentifier(undefined, false)).toBe(false);
  expect(isServiceIdentifier(null, false)).toBe(false);
  expect(isServiceIdentifier(NaN, false)).toBe(false);
  expect(isServiceIdentifier([], false)).toBe(false);

  expect(isServiceIdentifier('', false)).toBe(false);
  expect(isServiceIdentifier('()[]{}', false)).toBe(false);
});

test('isQueueConfig testing', () => {
  expect(isQueueConfig(null)).toBe(false);
  expect(isQueueConfig({})).toBe(false);
  expect(isQueueConfig({
    'any': 'thing'
  })).toBe(false);
  expect(isQueueConfig({
    errorLevel: []
  })).toBe(false);
  expect(isQueueConfig({
    errorLevel: 'sadf'
  })).toBe(false);
  expect(isQueueConfig({
    errorLevel: ErrorThrowLevel.NONE - 1
  })).toBe(false);
  expect(isQueueConfig({
    errorLevel: ErrorThrowLevel.ALL + 1
  })).toBe(false);

  expect(isQueueConfig({
    errorLevel: [ErrorThrowLevel.ADD_POSSIBLE_CIRCULAR_DEPENDENCY, ErrorThrowLevel.ALL]
  })).toBe(true);
  expect(isQueueConfig({
    errorLevel: ErrorThrowLevel.ADD_POSSIBLE_CIRCULAR_DEPENDENCY |
     ErrorThrowLevel.NONE
  })).toBe(true);
});
