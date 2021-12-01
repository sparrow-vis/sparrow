import { createThreshold } from '../../src/scale';

describe('createThreshold', () => {
  test('createThreshold(options) finds intervals based on domain and returns corresponding value in range.', () => {
    const s = createThreshold({
      domain: [1 / 3, 2 / 3],
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
