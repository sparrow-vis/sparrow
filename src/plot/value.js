import { firstOf } from '../utils';

export function valueOf(data, value) {
  if (typeof value === 'function') return data.map(value);
  if (typeof value === 'number') return data.map(() => value);
  if (typeof value === 'string') {
    if (firstOf(data)[value] === undefined) return data.map(() => value);
    return data.map((d) => d[value]);
  }
  throw new Error(`Bad encoding value: ${value}.`);
}
