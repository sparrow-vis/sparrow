import { group, identity } from '../utils';

function stack(values, accessor = identity) {
  const stackedValues = [0];
  for (const [i, v] of Object.entries(values)) {
    const pv = stackedValues[i];
    const cv = pv + accessor(v);
    stackedValues.push(cv);
  }
  return stackedValues;
}

export function createStack({ fields = [], as = [], key }) {
  const [y] = fields;
  const [y1, y2] = as;
  return (data) => {
    const series = key ? Array.from(group(data, key).values()) : [data];
    return series.flatMap((data) => {
      const stackedValues = stack(data, (d) => d[y]);
      return data.map((d, i) => ({
        ...d,
        [y1]: stackedValues[i],
        [y2]: stackedValues[i + 1],
      }));
    });
  };
}
