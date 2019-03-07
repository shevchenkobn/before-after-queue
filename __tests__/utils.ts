export function matchThrownError(fn: Function, ...args: any[]) {
  try {
    fn(...args);
  } catch (err) {
    return err;
  }
}
