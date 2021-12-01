import { createQuantize } from '../../src/scale';

describe('createQuantize', () => {
  test('createQuantize(options) finds intervals based on value and returns corresponding value in range.', () => {
    const s = createQuantize({
      domain: [0, 1],
      range: ['a', 'b', 'c'],
    });

    expect(s(0)).toBe('a');
    expect(s(0.2)).toBe('a');
    expect(s(0.4)).toBe('b');
    expect(s(0.6)).toBe('b');
    expect(s(0.8)).toBe('c');
    expect(s(1)).toBe('c');
  });
});
