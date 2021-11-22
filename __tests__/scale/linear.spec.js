import {
  createLinear,
  linearNice,
  linearTicks,
  interpolateNumber,
} from '../../src/scale';

describe('test Linear', () => {
  test('createLinear(options) returns a a linear function.', () => {
    const s = createLinear({
      domain: [0, 1],
      range: [0, 100],
    });

    expect(s(0)).toBe(0);
    expect(s(0.3)).toBe(30);
    expect(s(0.5)).toBe(50);
    expect(s(0.7)).toBe(70);
    expect(s(1)).toBe(100);
  });

  test('createLinear(options) uses custom interpolate.', () => {
    const s = createLinear({
      domain: [0, 1],
      range: ['a', 'z'],
      interpolate: (t, start, end) => {
        const charCode = interpolateNumber(
          t,
          start.charCodeAt(),
          end.charCodeAt(),
        );
        return String.fromCharCode(charCode);
      },
    });

    expect(s(0)).toBe('a');
    expect(s(1)).toBe('z');
    expect(s(0.5)).toBe('m');
  });

  test('linearNice(domain, tickCount) extends domain for better ticks.', () => {
    expect(linearNice([1.1, 10.9], 10)).toEqual([1, 11]);
    expect(linearNice([0.7, 11.001], 10)).toEqual([0, 12]);
    expect(linearNice([0, 0.49], 10)).toEqual([0, 0.5]);
    expect(linearNice([12, 87], 5)).toEqual([0, 100]);
    expect(linearNice([12, 87], 10)).toEqual([10, 90]);
    expect(linearNice([12, 87], 100)).toEqual([12, 87]);
  });

  test('linearTicks(domain, tickCount) return ticks in 1, 2, 5 * 10 ^ n format', () => {
    const ticks10 = linearTicks([0, 1], 10);
    const ticks9 = linearTicks([0, 1], 9);
    const ticks8 = linearTicks([0, 1], 9);
    const ticks7 = linearTicks([0, 1], 7);
    const ticks6 = linearTicks([0, 1], 6);
    const ticks5 = linearTicks([0, 1], 5);
    const ticks4 = linearTicks([0, 1], 4);
    const ticks3 = linearTicks([0, 1], 3);
    const ticks2 = linearTicks([0, 1], 2);
    const ticks1 = linearTicks([0, 1], 1);
    expect(ticks10).toEqual([
      0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ]);
    expect(ticks9).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
    expect(ticks8).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
    expect(ticks7).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(ticks6).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(ticks5).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(ticks4).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(ticks3).toEqual([0, 0.5, 1]);
    expect(ticks2).toEqual([0, 0.5, 1]);
    expect(ticks1).toEqual([0, 1]);
  });
});
