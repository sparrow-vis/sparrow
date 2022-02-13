import { identity, round } from './helper';

export function group(array, key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}

// @see https://github.com/d3/d3-array/blob/main/src/ticks.js#L46
export function tickStep(min, max, count) {
  const e10 = Math.sqrt(50);
  const e5 = Math.sqrt(10);
  const e2 = Math.sqrt(2);
  const step0 = Math.abs(max - min) / Math.max(0, count);
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  const error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return step1;
}

export function ticks(min, max, count) {
  if (min === max) return [min];
  const step = tickStep(min, max, count);
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

export function bisect(array, x, lo = 0, hi = array.length, accessor = identity) {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}

export function lastOf(array) {
  return array[array.length - 1];
}

export function firstOf(array) {
  return array[0];
}

export function indexOf(array) {
  return array.map((_, i) => i);
}

export function min(array, accessor) {
  return Math.min(...array.map(accessor));
}

export function max(array, accessor) {
  return Math.max(...array.map(accessor));
}

export function mean(array, accessor = identity) {
  return array
    .map(accessor)
    .reduce((sum, v) => sum + v) / array.length;
}

export function median(array, accessor = identity) {
  const sortedValues = [...array].map(accessor).sort();
  const i = (sortedValues.length - 1) / 2;
  const a = sortedValues[Math.floor(i)];
  const b = sortedValues[Math.ceil(i)];
  return (a + b) / 2;
}

// eslint-disable-next-line no-unused-vars
export function count(array, accessor = identity) {
  return array.length;
}

export function sum(array, accessor = identity) {
  return array.map(accessor).reduce((sum, v) => sum + v);
}
