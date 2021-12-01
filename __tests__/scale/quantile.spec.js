import { createQuantile } from '../../src/scale';

describe('createQuantile', () => {
  test('createQuantile(options) finds right interval based on rank and returns corresponding value in range.', () => {
    const s = createQuantile({
      domain: [3, 6, 7, 8, 8, 10, 13, 15, 16, 20],
      range: ['a', 'b', 'c', 'd'],
    });

    expect(s(3)).toBe('a');
    expect(s(7.1)).toBe('a');
    expect(s(8)).toBe('b');
    expect(s(8.9)).toBe('b');
    expect(s(9)).toBe('c');
    expect(s(13)).toBe('c');
    expect(s(14.9)).toBe('d');
    expect(s(20)).toBe('d');
  });
});
