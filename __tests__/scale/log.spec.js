import { createLog } from '../../src/scale';

function nice(domain, niceDomain, base) {
  const scale = createLog({
    domain,
    range: [0, 1],
    base,
  });
  scale.nice();
  const [r0, r1] = niceDomain.map(scale);
  return r0 === 0 && r1 === 1;
}

function ticks(domain, base, tickCount) {
  const scale = createLog({ domain, base, range: [0, 1] });
  scale.nice();
  return scale.ticks(tickCount);
}

describe('createLog', () => {
  test('createLog(options) returns log function and only accept x > 0.', () => {
    const s = createLog({
      domain: [1, 10],
      range: [0, 1],
    });

    expect(s(1)).toStrictEqual(0);
    expect(s(2)).toBeCloseTo(0.301, 3);
    expect(s(5)).toBeCloseTo(0.699, 3);
  });

  test('scale.nice(base) extends domain for better ticks.', () => {
    expect(nice([10, 50], [8, 64], 2)).toBeTruthy();
    expect(nice([10, 50], [9, 81], 3)).toBeTruthy();
    expect(nice([10, 50], [4, 64], 4)).toBeTruthy();
    expect(nice([10, 50], [5, 125], 5)).toBeTruthy();
  });

  test('scale.ticks(tickCount) returns ticks in base ^ n format.', () => {
    expect(ticks([10, 100], 2, 5)).toEqual([8, 16, 32, 64, 128]);
    expect(ticks([1, 1e5], 10, 5)).toEqual([1, 10, 100, 1000, 10000, 100000]);
  });
});
