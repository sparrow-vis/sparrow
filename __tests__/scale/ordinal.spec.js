import { createOrdinal } from '../../src/scale';

describe('test Ordinal', () => {
  test('createOrdinal(options) returns a one-to-one mapper.', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s('a')).toBe('red');
    expect(s('b')).toBe('yellow');
    expect(s('c')).toBe('blue');
  });

  test('createOrdinal(options) will mod map.', () => {
    const s = createOrdinal({
      domain: ['a', 'b', 'c', 'd', 'e'],
      range: ['red', 'yellow', 'blue'],
    });
    expect(s('d')).toBe('red');
    expect(s('e')).toBe('yellow');
  });
});
