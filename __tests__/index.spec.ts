test('export index.ts test', async () => {
  const module = await import('../dist');

  expect(typeof module.BeforeAfterQueue).toBe('function');

  expect(typeof module.QueueNode).toBe('function');
  expect(typeof module.cloneQueueOrderPointer).toBe('function');
  expect(typeof module.isQueueOrderPointer).toBe('function');

  expect(typeof module.QueueError).toBe('function');
  expect(typeof module.QueueNodeError).toBe('function');
  expect(typeof module.QueueErrorCode).toBe('object');
  expect(typeof module.getErrorMessage).toBe('function');
  expect(typeof module.ErrorThrowLevel).toBe('object');
  expect(typeof module.isErrorThrowLevel).toBe('function');

  expect(typeof module.isServiceIdentifier).toBe('function');
  expect(typeof module.getRegexString).toBe('function');
  expect(typeof module.isQueueConfig).toBe('function');
});
