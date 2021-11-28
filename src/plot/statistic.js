import { createStack } from '../statistic';
import { compose, identity } from '../utils';
import { fromObject } from './utils';

export function applyStatistics(index, values, geometryType, descriptors) {
  const objectValues = fromObject(values, (d) => d.channel, (d) => d.value);
  const statistics = descriptors.map((options) => createStatistics(geometryType, options));
  const transform = statistics.length ? compose(...statistics) : identity;
  const [, transformedValues] = transform([index, objectValues]);
  return Object.entries(transformedValues).map(([key, value]) => ({ channel: key, value }));
}

function createStatistics(geometryType, { type, ...options }) {
  if (type === 'stack') return createStack(inferStack(geometryType, options));
  throw new Error(`unknown statistics type: ${type}`);
}

function inferStack(geometryType, { x = 'x', y = 'y', y1 = 'y1' }) {
  return { x, y, y1 };
}
