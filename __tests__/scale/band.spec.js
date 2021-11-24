import { createBand } from '../../src/scale';

describe('test Band', () => {
  test('createBand(options) return mapper maps discrete domain to continuous range.', () => {
    const s = createBand({
      domain: ['a', 'b', 'c'],
      range: [0, 32],
      padding: 0.2,
    });
    expect(s('a')).toBe(2);
    expect(s('b')).toBe(12);
    expect(s('c')).toBe(22);
    expect(s.bandWidth()).toBe(8);
    expect(s.step()).toBe(10);
  });
});
