import { bisect, ticks, identity, group, tickStep, floor, ceil, firstOf, min, max } from '../utils';

function bin(values, count = 10, accessor = identity) {
  const minValue = min(values, accessor);
  const maxValue = max(values, accessor);
  const step = tickStep(minValue, maxValue, count);
  const niceMin = floor(minValue, step);
  const niceMax = ceil(maxValue, step);
  const niceStep = tickStep(niceMin, niceMax, count);
  const thresholds = ticks(niceMin, niceMax, count);
  return Array.from(new Set([
    floor(niceMin, niceStep),
    ...thresholds,
    ceil(niceMax, niceStep),
  ]));
}

export function createBinX({ count = 10, channel, aggregate = (values) => values.length } = {}) {
  return ({ index, values }) => {
    const { [channel]: C, x: X, x1, ...rest } = values;
    const keys = Object.keys(rest);
    const thresholds = bin(X, count);
    const n = thresholds.length;
    const groups = group(index, (i) => bisect(thresholds, X[i]) - 1);
    const I = new Array(n - 1).fill(0).map((_, i) => i);
    const filtered = I.filter((i) => groups.has(i));
    return {
      index: filtered,
      values: Object.fromEntries([
        ...keys.map((key) => [key, I.map((i) => {
          if (!groups.has(i)) return undefined;
          return values[key][firstOf(groups.get(i))];
        })]),
        [channel, I.map((i) => {
          if (!groups.has(i)) return 0;
          return aggregate(groups.get(i).map((index) => values[index]));
        })],
        ['x', thresholds.slice(0, n - 1)],
        ['x1', thresholds.slice(1, n)],
      ]),
    };
  };
}
