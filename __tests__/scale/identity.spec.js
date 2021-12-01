import { createIdentity } from '../../src/scale';

describe('createIdentity', () => {
  test('createIdentity() returns a identity function', () => {
    const s = createIdentity();

    expect(s(1)).toBe(1);
    expect(s(true)).toBe(true);
    expect(s('hello world')).toBe('hello world');
    expect(s({ a: 1 })).toEqual({ a: 1 });
  });
});
