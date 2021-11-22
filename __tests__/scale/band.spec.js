import { createBand, bandWidth, bandStep } from '../../src/scale';

describe('test Band', () => {
  const options = {
    domain: ['a', 'b', 'c'],
    range: [0, 32],
    padding: 0.2,
  };

  test('createBand(options) return mapper maps discrete domain to continuous range.', () => {
    const s = createBand(options);
    expect(s('a')).toBe(2);
    expect(s('b')).toBe(12);
    expect(s('c')).toBe(22);
  });

  test('bandWidth(options) returns band width.', () => {
    expect(bandWidth(options)).toBe(8);
  });

  test('bandStep(options) returns step width.', () => {
    expect(bandStep(options)).toBe(10);
  });
});
