import { min, max, mean, median, count, sum } from './aggregate';
import { group } from '../utils';

function createSummary(aggregate) {
  return ({ fields = [], key, as = [] }) => {
    const [x, y] = fields;
    const [x1 = x, y1 = y] = as;
    return (data) => {
      const series = key ? group(data, key).values() : [data];
      return Array.from(series, (data) => ({
        ...data[0],
        ...x1 && { [x1]: aggregate(data, (d) => d[x]) },
        ...y1 && { [y1]: aggregate(data, (d) => d[y]) },
      }));
    };
  };
}

export function createMin(options) {
  return createSummary(min)(options);
}

export function createMax(options) {
  return createSummary(max)(options);
}

export function createMean(options) {
  return createSummary(mean)(options);
}

export function createMedian(options) {
  return createSummary(median)(options);
}

export function createCount(options) {
  return createSummary(count)(options);
}

export function createSum(options) {
  return createSummary(sum)(options);
}
