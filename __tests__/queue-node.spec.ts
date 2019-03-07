import { cloneQueueOrderPointer, isQueueOrderPointer, QueueError, QueueErrorCode } from '../dist';
import { matchThrownError } from './utils';

describe('isQueueOrderPointer valid values-strings', () => {
  expect(isQueueOrderPointer('all')).toBe(true);
  expect(isQueueOrderPointer('all always')).toBe(true);
});

describe('isQueueOrderPointer valid values-arrays', () => {
  expect(isQueueOrderPointer(['111', 'asdf', '_henlo-world'])).toBe(true);
  expect(isQueueOrderPointer(['111', Symbol(), Symbol.for('asdf')])).toBe(true);
});

describe('isQueueOrderPointer invalid values with throwing', () => {
  const typeError = new QueueError(QueueErrorCode.QUEUE_ORDER_POINTER_BAD_TYPE);

  expect(matchThrownError(isQueueOrderPointer, '')).toMatchObject(typeError);
  expect(matchThrownError(isQueueOrderPointer, '', true)).toMatchObject(typeError);

  expect(matchThrownError(isQueueOrderPointer, 1234, true)).toMatchObject(typeError);
  expect(matchThrownError(isQueueOrderPointer, Symbol())).toMatchObject(typeError);

  const arrayError = new QueueError(QueueErrorCode.QUEUE_ORDER_POINTER_BAD_ARRAY);

  expect(matchThrownError(isQueueOrderPointer, [])).toMatchObject(arrayError);
  expect(matchThrownError(isQueueOrderPointer, ['asdf', '__1', true])).toMatchObject(arrayError);
  expect(matchThrownError(isQueueOrderPointer, ['asdf', NaN])).toMatchObject(arrayError);
});

describe('isQueueOrderPointer invalid values without throwing', () => {
  expect(isQueueOrderPointer('', false)).toBe(false);
  expect(isQueueOrderPointer(1234, false)).toBe(false);
  expect(isQueueOrderPointer({}, false)).toBe(false);
  expect(isQueueOrderPointer([], false)).toBe(false);
  expect(isQueueOrderPointer(['asdf', false], false)).toBe(false);
});

test('cloneQueueOrderPointer testing', () => {
    expect(cloneQueueOrderPointer('all')).toBe('all');
    expect(cloneQueueOrderPointer(['sdf', Symbol.for('asdf'), '___'])).toMatchObject(['sdf', Symbol.for('asdf'), '___']);
});

test('QueueNode testing', () => {
  // TODO: create an API with anonymous id
});

test('QueueInnerNode testing', () => {
  // TODO: create an API with anonymous id
});
