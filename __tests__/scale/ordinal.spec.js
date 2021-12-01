import { createOrdinal } from '../../src/scale';

describe('createOrdinal', () => {
  test('createOrdinal(options) returns a one-to-one scale.', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s('a')).toBe('red');
    expect(s('b')).toBe('yellow');
    expect(s('c')).toBe('blue');
  });

  test('Ordinal scale will mode map.', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c', 'd', 'e'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s('d')).toBe('red');
    expect(s('e')).toBe('yellow');
  });
});
