import { identity } from '../utils';

export function min(values, accessor = identity) {
  return Math.min(...values.map(accessor));
}

export function max(values, accessor = identity) {
  return Math.max(...values.map(accessor));
}

export function mean(values, accessor = identity) {
  return values
    .map(accessor)
    .reduce((sum, v) => sum + v) / values.length;
}

export function median(values, accessor = identity) {
  const sortedValues = [...values].map(accessor).sort();
  const i = (sortedValues.length - 1) / 2;
  const a = sortedValues[Math.floor(i)];
  const b = sortedValues[Math.ceil(i)];
  return (a + b) / 2;
}

// eslint-disable-next-line no-unused-vars
export function count(values, accessor = identity) {
  return values.length;
}

export function sum(values, accessor = identity) {
  return values.map(accessor).reduce((sum, v) => sum + v);
}

export function createAggregate(name) {
  const aggregate = ({
    min,
    max,
    mean,
    median,
    count,
    sum,
  })[name];
  if (!aggregate) throw new Error(`Unknown aggregate type: ${name}`);
  return aggregate;
}
